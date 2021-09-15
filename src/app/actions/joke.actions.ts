import { Joke } from '../models/JokesModel';

export class AddJokeToFavourites {
  static readonly type = 'Add Joke';
  constructor(public payload: Joke) {}
}

export class SetJokes {
  static readonly type = 'Set Jokes';
  constructor() {}
}

export class RemoveJoke {
  static readonly type = 'Remove Joke';
  constructor(public id: number) {}
}

export class FetchNewJoke {
  static readonly type = 'Fetch new joke';
  constructor(public payload: Joke) {}
}

export class RemoveAllJokesFromFavourites {
  static readonly type = 'Remove all jokes from favourites';
  constructor() {}
}

export class EditJokeRating {
  static type = 'Edit rating for current joke';
  constructor(public id: number, public newRating: number) {}
}
