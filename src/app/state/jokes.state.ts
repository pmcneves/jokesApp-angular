import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddJoke, RemoveJoke } from "../actions/joke.actions";
import { Joke } from "../models/JokesModel";

export class JokeStateModel {
  jokes: Joke[]
  @State<JokeStateModel>({
    name: 'jokes',
    defaults: {

    }
  })
}
