export interface IGenre {
    id: number
    name: string
  }
  
  export interface IMovie {
    adult: boolean
    title: string
    backdrop_path: string
    media_type?: string
    release_date?: string
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
  }
  
  export interface IElement {
    type:
      | 'Bloopers'
      | 'Featurette'
      | 'Behind the Scenes'
      | 'Clip'
      | 'Trailer'
      | 'Teaser'
  }