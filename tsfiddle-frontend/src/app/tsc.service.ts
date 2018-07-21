import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TscService {
  constructor(
    private http: HttpClient
  ) { }

  compileCode(typeScriptCode: string) {
    return this.http.get(`${environment.apiUrl}/compile`);
  }

}
