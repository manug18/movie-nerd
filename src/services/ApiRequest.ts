import { UpcomingMoviesResponse } from "../models/UpcomingMovie";
import { getAxiosInstance, getNetworkConfig } from "./BaseService";
import { Endpoints } from "./EndPoints";

export async function getUpcomingMovies() {
    const axios = getAxiosInstance();
    const res = await axios.get<UpcomingMoviesResponse>(
      Endpoints.getUpcomingMovie,
      getNetworkConfig(true)
    );
    return res.data;
  }