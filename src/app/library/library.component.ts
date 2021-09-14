import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoveJoke } from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';
import { JokeState, JokeStateModel } from '../state/jokes.state';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  public jokesState: Joke[];
  public faTimes = faTimes
  @Select(JokeState.getJokes) jokesSelector$: Observable<Joke[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.jokesSelector$
      .subscribe((jokesAux) => {
        this.jokesState = jokesAux;
      });
  }

  removeFavourite(id: number) {
    this.store.dispatch(new RemoveJoke(id))
  }


}
