import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from 'src/app/models/JokesModel';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  jokesUrl: string = 'https://v2.jokeapi.dev/joke/Any'
  constructor(private http: HttpClient) { }

  getJokes(): Observable<Joke> {
    return this.http.get<Joke>(this.jokesUrl)
  }
}
