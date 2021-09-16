import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Joke, JokeData } from 'src/app/models/JokesModel';
import { SetLoadingJoke } from 'src/app/actions/joke.actions';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class JokesService {
  currentJoke: Subject<JokeData> = new Subject<JokeData>();

  jokesUrl: string = 'https://v2.jokeapi.dev/joke/Any';

  constructor(private http: HttpClient, private store: Store) { }

  getJokes(): void {
    this.store.dispatch(new SetLoadingJoke(true));
    this.http.get<JokeData>(this.jokesUrl).subscribe(joke => {
      this.currentJoke.next(joke);
      this.store.dispatch(new SetLoadingJoke(false));
    });
  }
}
