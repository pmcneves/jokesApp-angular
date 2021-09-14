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
  styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
  faLaugh = faLaugh;
  joke: Joke;
  loading: boolean = false;
  isAddedToFavourites: boolean = false;
  isModalOpen: boolean = false;
  @Select(JokeState.getJoke) jokeSelector$: Observable<Joke>;

  constructor(private jokesService: JokesService, private store: Store) {}

  ngOnInit(): void {
    this.jokeSelector$.subscribe((joke) => !this.isObjectEmpty(joke.jokeData) ? (this.joke = joke) : {})
  }

  private isObjectEmpty(obj: {}): boolean {
    for (const id in obj) {
      return false;
    }
    return true;
  }

  gettingJokes() {
    this.loading = true;
    this.jokesService.getJokes();
    this.jokesService.currentJoke
    .subscribe((data) => {
      this.joke = {
        jokeData: data,
        isFavourite: false,
      };
      this.loading = false;
      this.isAddedToFavourites = false;
      this.store.dispatch(new FetchNewJoke(this.joke));
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
