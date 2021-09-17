import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddCustomJoke } from '../actions/joke.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onAddJokeFormSubmit(data: {category: string, joke: string}) {
    this.store.dispatch(new AddCustomJoke(data))
  }

}
