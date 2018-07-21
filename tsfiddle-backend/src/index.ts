import * as express from 'express';
import { resolve } from 'url';
import {exec} from 'child_process';
const fs = require('fs-extra');
const uuidv1 = require('uuid/v1');
const GENERATED_FILES_DIRECTORY = 'generated';
const util = require('util');
const execPromise = util.promisify(exec);
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

enum STATUS_CODES {
  BAD_REQUEST = 400
}

const loggerCode: string = `const log = (input) => {
  const div = document.createElement('DIV');
  div.innerHTML = '> ' + input;
  document.getElementById('output').appendChild(div);
}\n\n`

app.use('/', express.static('ng-dist/tsfiddle-frontend'));

app.post('/api/compile', async function (req: any, res) {
  try {
    const input = req.body.input;
    const uuid = uuidv1();
    const fileWithoutExtesion = `${GENERATED_FILES_DIRECTORY}/${uuid}`
    const tsFile = fileWithoutExtesion + '.ts';
    const jsFile = fileWithoutExtesion + '.js';
    await fs.outputFile(tsFile, `${loggerCode}${input.replace(/console\.log/g, 'log')}`);
    try {
      await execPromise(`tsc --lib es5,es2015,dom ${tsFile}`);
    } catch (err) {
      res.send({
        compilationError: err
      });
    }
    const js = await fs.readFile(jsFile, 'utf8');
    res.send({compiledJS: js});
  } catch (err) {
    res.status(500).send(err);
  }
});
const port = 5638
app.listen(port);
console.log(`listening on port ${port}`);
