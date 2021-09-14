import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetJokes } from './actions/joke.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jokesApp-angular';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new SetJokes())
  }
}
