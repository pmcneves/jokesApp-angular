import { Joke } from "../models/JokesModel";

export class AddJoke {
  static readonly type = 'Add Joke';
  constructor(public payload: Joke) {}
}

export class SetJokes {
  static readonly type ='Set Jokes';
  constructor() {}
}

export class RemoveJoke {
  static readonly type = 'Remove Joke';
  constructor(public id: number) {}
}
