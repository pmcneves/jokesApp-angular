import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddCustomJoke,
  AddJokeToFavourites,
  EditJokeRating,
  FetchNewJoke,
  RemoveAllJokesFromFavourites,
  RemoveJoke,
  SetJokes,
  SetLoadingJoke,
  SortBy,
} from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';

export class JokeStateModel {
  joke: Joke | null;
  favourites: Joke[];
  error: string | null;
  sortBy: string;
  loading: boolean;
}
@State<JokeStateModel>({
  name: 'jokesState',
  defaults: {
    joke: null,
    favourites: [],
    error: null,
    sortBy: '',
    loading: false,
  },
})
export class JokeState {
  @Selector()
  static getJokes(state: JokeStateModel) {
    return state.favourites;
  }

  @Selector()
  static getSortedJokes(state: JokeStateModel) {
    return [...state.favourites].sort(
      (j1: Joke, j2: Joke): number => {
        if (state.sortBy === 'ratingAsc') {
          return j1.starRating < j2.starRating ? 1 : -1;
        } else if (state.sortBy === 'ratingDesc') {
          return j2.starRating < j1.starRating ? 1 : -1;
        }
        return 0
      }
    );
  }

  @Selector()
  static getJoke(state: JokeStateModel) {
    return state.joke;
  }

  @Selector()
  static getLoadingJoke(state: JokeStateModel) {
    return state.loading;
  }

  @Action(AddJokeToFavourites)
  add(
    { getState, patchState }: StateContext<JokeStateModel>,
    { payload }: AddJokeToFavourites
  ) {
    const state = getState();
    patchState({
      favourites: [...state.favourites, payload],
    });
    localStorage.setItem(
      'favourites',
      JSON.stringify([...state.favourites, payload])
    );
  }

  @Action(FetchNewJoke)
  fetchNewJoke(
    { patchState }: StateContext<JokeStateModel>,
    { payload }: FetchNewJoke
  ) {
    patchState({
      joke: payload,
    });
    localStorage.setItem('joke', JSON.stringify(payload));
  }

  @Action(SetJokes)
  set({ patchState }: StateContext<JokeStateModel>) {
    const localStore = localStorage.getItem('favourites');
    const localJokes = localStore ? JSON.parse(localStore) : [];
    patchState({
      favourites: localJokes,
    });
  }

  @Action(RemoveJoke)
  remove(
    { getState, patchState }: StateContext<JokeStateModel>,
    { id }: RemoveJoke
  ) {
    patchState({
      favourites: getState().favourites.filter(
        (favourite) => favourite.jokeData?.id != id
      ),
    });
    localStorage.setItem('favourites', JSON.stringify(getState().favourites));
  }

  @Action(RemoveAllJokesFromFavourites)
  removeAll({ patchState }: StateContext<JokeStateModel>) {
    patchState({
      favourites: [],
    });
    localStorage.removeItem('favourites');
  }

  @Action(EditJokeRating)
  editJokeRating(
    { getState, patchState }: StateContext<JokeStateModel>,
    { id, newRating }: EditJokeRating
  ) {
    const state = getState();
    let favouriteToEdit = state.favourites.find(
      (favourite) => favourite.jokeData.id === id
    ) as Joke;
    favouriteToEdit = {
      ...favouriteToEdit,
      starRating: newRating,
    };
    const favouriteToEditIndex = state.favourites.findIndex(
      (favourite) => favourite.jokeData.id === id
    );
    patchState({
      favourites: [
        ...state.favourites.slice(0, favouriteToEditIndex),
        favouriteToEdit,
        ...state.favourites.slice(favouriteToEditIndex + 1),
      ] as Joke[],
    });
    localStorage.setItem('favourites', JSON.stringify(getState().favourites));
  }

  @Action(SortBy)
  sortByFilter(
    { patchState }: StateContext<JokeStateModel>,
    { sortBy }: SortBy
  ) {
    patchState({
      sortBy: sortBy,
    });
  }

  @Action(SetLoadingJoke)
  SetLoadingJoke(
    { patchState }: StateContext<JokeStateModel>,
    { payload }: SetLoadingJoke
  ) {
    patchState({
      loading: payload,
    });
  }

  @Action(AddCustomJoke)
  addCustomJoke(
    { getState, patchState }: StateContext<JokeStateModel>,
    {payload} : AddCustomJoke) {
      const addJokeObj: Joke = {
        jokeData: {
          error: false,
          category: payload.category,
          flags: {
            nsfw: false,
            religious: false,
            political: false,
            racist: false,
            sexist: false,
            explicit: false
          },
          id: Math.floor(Math.random()*1000),
          joke: payload.joke,
          type:'single',
          safe: true,
          lang: "en",
        },
        isFavourite: true,
        starRating: 5
      }
      const state= getState()
      patchState({
        favourites: [
          ...state.favourites,
          addJokeObj
        ]
      })
    }
}


