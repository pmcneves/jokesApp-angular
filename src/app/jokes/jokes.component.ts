import { Component, OnInit } from '@angular/core';
import { faLaugh } from '@fortawesome/free-regular-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddJokeToFavourites, FetchNewJoke } from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';
import { JokesService } from '../services/jokes/jokes.service';
import { JokeState } from '../state/jokes.state';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  faLaugh = faLaugh;
  joke: Joke;
  loading: boolean = false;
  isAddedToFavourites: boolean = false
  @Select(JokeState.getJoke) jokeSelector$: Observable<Joke>

  constructor(private jokesService: JokesService, private store: Store) { }

  ngOnInit(): void {
    this.jokeSelector$.subscribe(joke => joke ? this.joke = joke : {} )
  }

  gettingJokes() {
    this.loading = true;
    this.jokesService.getJokes().subscribe(data => {
      this.joke = data;
      this.loading = false;
      this.isAddedToFavourites=false;
      this.store.dispatch(new FetchNewJoke(this.joke))
    })
  }

  addToFavourites() {
    this.store.dispatch(new AddJokeToFavourites(this.joke!))
    this.isAddedToFavourites = true;
    this.gettingJokes();
  }
}
