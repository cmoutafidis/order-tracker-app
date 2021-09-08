import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  apiUrl = 'http://localhost:8080';
  constructor() { }
}
