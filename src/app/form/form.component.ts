import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddCustomJoke } from '../actions/joke.actions';
import { FormModel } from '../models/FormModel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  publicForm: FormModel;
  rating: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.publicForm = new FormModel();
  }

  onAddJokeFormSubmit(data: FormModel) {
    this.store.dispatch(new AddCustomJoke(data, this.rating));
    this.publicForm = new FormModel();
    this.rating = 1;
  }

  getSelectedStarRating(rating: number) {
    this.rating = rating;
  }
}
