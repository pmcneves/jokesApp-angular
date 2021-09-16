import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddJokeToFavourites, FetchNewJoke } from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';
import { JokesService } from '../services/jokes/jokes.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output() closeButtonClicked = new EventEmitter<boolean>();
  @Input() joke: Joke | null;
  jokeRating: number = 1;

  constructor(private store: Store, private jokesService: JokesService) { }


  closeModal() {
    this.closeButtonClicked.emit();
  }

  addToFavourites() {
    if (this.joke) {
      this.joke = {
        ...this.joke,
        isFavourite: true,
        starRating: this.jokeRating,
      };
      this.store.dispatch(new AddJokeToFavourites(this.joke));
      this.jokesService.getJokes();
      this.closeModal();
    }
  }

  getSelectedStarRating(rating: number) {
    this.jokeRating = rating;
  }
}
