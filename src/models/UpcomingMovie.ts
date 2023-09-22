export interface Movie{
    adult:boolean;
    backdrop_path:string;
    genre_ids:number[];
    id:number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path:string;
    release_date:string;
    title:string;
    video:boolean;
    vote_average:number;
    vote_count:number;

}
export interface MoviesResponse {
    dates:string[];
    page:number;
    results:Movie[];
    total_pages:number;
    total_results:number;
}
export interface MovieDetails{
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: CollectionResponse;
    budget: number;
    genres:GenreResponse[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies:ProductionDetails[];
    production_countries:ProductionCountryDetails[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
            english_name: string;
            iso_639_1: string;
            name: string;
        }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    }
    
export interface CollectionResponse{
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}
export interface GenreResponse {
    id:number;
    name:string;
}
export interface ProductionDetails{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
export interface ProductionCountryDetails{
    iso_3166_1: string;
    name: string;
}

export interface MovieCastInformation {
    id:number;
    cast:CastDetails[]
}

export interface CastDetails{
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: string;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
    }
