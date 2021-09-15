export type JokeData = {
  error: string,
  category: string,
  type: string,
  setup?: string,
  delivery?: string,
  joke?: string,
  flags: Flags,
  id: number,
  safe: boolean,
  lang: string,
}

export type Joke = {
  jokeData: JokeData,
  isFavourite: boolean,
  starRating?: number,
}

interface Flags {
  nsfw: boolean,
  religious: boolean,
  political: boolean,
  racist: boolean,
  sexist: boolean,
  explicit: boolean
}
