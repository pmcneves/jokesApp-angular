import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddJokeToFavourites, FetchNewJoke, RemoveJoke, SetJokes } from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';

export class JokeStateModel {
  jokes: Joke[];
  currentJoke: Joke | null
}
@State<JokeStateModel>({
  name: 'jokesState',
  defaults: {
    jokes: [],
    currentJoke: null
  },
})
export class JokeState {
  @Selector()
  static getJokes(state: JokeStateModel) {
    return state.jokes;
  }

  @Action(AddJokeToFavourites)
  add(
    { getState, patchState }: StateContext<JokeStateModel>,
    { payload }: AddJokeToFavourites
  ) {
    const state = getState();
    patchState({
      jokes: [...state.jokes, payload],
    });
    localStorage.setItem('jokes', JSON.stringify([...state.jokes, payload]));
  }

  @Action(FetchNewJoke)
  fetchNewJoke({patchState}: StateContext<JokeStateModel>, {payload}: FetchNewJoke) {
    patchState({
      currentJoke: payload
    })
    localStorage.setItem('joke', JSON.stringify(payload))
  }

  @Action(SetJokes)
  set({patchState} : StateContext<JokeStateModel>) {
    const localStore = localStorage.getItem('jokes')
    const localJokes = localStore ?  JSON.parse(localStore) : []
    patchState({
      jokes: localJokes
    })
  }

  @Action(RemoveJoke)
  remove(
    { getState, patchState }: StateContext<JokeStateModel>,
    { id }: RemoveJoke
  ) {
    patchState({
      jokes: getState().jokes.filter((joke) => joke.id != id),
    });
    localStorage.setItem('jokes', JSON.stringify(getState().jokes))
  }
}
