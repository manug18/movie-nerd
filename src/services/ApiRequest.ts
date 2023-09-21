import { MoviesResponse } from "../models/UpcomingMovie";
import { getAxiosInstance, getNetworkConfig } from "./BaseService";
import { Endpoints } from "./EndPoints";

export async function getUpcomingMovies() {
    const axios = getAxiosInstance();
    const res = await axios.get<MoviesResponse>(
      Endpoints.getUpcomingMovie,
      getNetworkConfig(true)
    );
    return res.data;
  }

  export async function getPopularMovies() {
    const axios = getAxiosInstance();
    const res = await axios.get<MoviesResponse>(
      Endpoints.getPopularMovies,
      getNetworkConfig(true)
    );
    return res.data;
  }
  export async function getTopRatedMovies() {
    const axios = getAxiosInstance();
    const res = await axios.get<MoviesResponse>(
      Endpoints.getTopRatedMovies,
      getNetworkConfig(true)
    );
    return res.data;
  }