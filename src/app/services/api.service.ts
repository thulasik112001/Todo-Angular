import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todos } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url='https://dummyjson.com/todos';
  constructor(private http:HttpClient){}
  getTodos(): Observable<{ todos: Todos[] }> {
  return this.http.get<{ todos: Todos[] }>(this.url);
}


}
