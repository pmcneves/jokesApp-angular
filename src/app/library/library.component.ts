import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  EditJokeRating,
  RemoveAllJokesFromFavourites,
  RemoveJoke,
  SortBy,
} from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';
import { JokeState } from '../state/jokes.state';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  public jokesState: Joke[];
  public faTimes = faTimes;
  public sortByModel: string = '';
  public sortedBy: string
  @Select(JokeState.getJokes) jokesSelector$: Observable<Joke[]>;
  @Select(JokeState.getSortedJokes) sortedJokesSelector$: Observable<Joke[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.jokesSelector$.subscribe((jokesAux) => {
      this.jokesState = jokesAux;
    });
  }

  removeFavourite(id: number) {
    this.store.dispatch(new RemoveJoke(id));
  }

  removeAllFavourites() {
    this.store.dispatch(new RemoveAllJokesFromFavourites());
  }

  getSelectedStarRating(rating: number, id: number) {
    this.store.dispatch(new EditJokeRating(id, rating));
  }

  sortBySelectHandler(event: string) {
    this.store.dispatch(new SortBy(event))
    this.sortedBy = event
    this.sortedJokesSelector$.subscribe(sortedArr => this.jokesState = sortedArr)
  }
}