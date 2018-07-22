import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseId } from './models';
import { environment } from '../environments/environment';
import { UnpersistedFiddle } from './fiddle.model';

const ENDPOINT_ROOT = `${environment.apiUrl}/fiddle`;

@Injectable({
  providedIn: 'root'
})
export class FiddleService {

  constructor(
    private http: HttpClient
  ) {}

  getFiddle(id: DatabaseId) {
    return this.http.get(`${ENDPOINT_ROOT}/${id}`);
  }

  createFiddle(content: string) {
    const fiddle: UnpersistedFiddle = {
      content: content
    }
    return this.http.post(ENDPOINT_ROOT, fiddle);
  }

}

function logIt(x) {
  console.log(x);
}

