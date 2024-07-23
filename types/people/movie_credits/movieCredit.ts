export interface moviePersonCredit {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string
    order: number;
  }
  
  export interface MoviePersonCreditResponse {
    cast: moviePersonCredit[];
    crew: moviePersonCredit[];
  }

  export interface useStoreMoviePersonCreditResposne {
    filter: string;
    setFilter: (filter: string) => void
  }