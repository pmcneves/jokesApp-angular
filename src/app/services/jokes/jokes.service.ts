import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Joke, JokeData } from 'src/app/models/JokesModel';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  currentJoke: Subject<JokeData> = new Subject<JokeData>();

  jokesUrl: string = 'https://v2.jokeapi.dev/joke/Any';
  constructor(private http: HttpClient) {}

  getJokes() : void {
    this.http.get<JokeData>(this.jokesUrl).subscribe(joke=>this.currentJoke.next(joke));
  }
}
