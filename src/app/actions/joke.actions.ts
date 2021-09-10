import { Joke } from "../models/JokesModel";

export class AddJoke {
  static readonly type = '[Joke] Add Joke';
  constructor(public joke: Joke) {}
}

export class RemoveJoke {
  static readonly type = '[Joke] Remove Joke';
  constructor(public joke: Joke) {}
}
