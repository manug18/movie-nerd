/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as axios from 'axios';
import AxiosInstance from './AxiosInstance';
import { Endpoints } from './EndPoints';
import { getAccessToken } from '../utils/StorageHelper';

export enum HttpContentType {
  Json = 'application/json',
  Text = 'text/plain',
  MultipartFormData = 'multipart/form-data',
}

export interface OverrideNetworkConfig {
  auth?: boolean;
  contentType?: HttpContentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any; // params are marked any in axios index
  responseType?: string; // Used for blobs in case of download
}

/**
 * Serves common cases for auth=true and content=json
 * @param auth
 * @param contentType
 * @returns
 */
export const getNetworkConfig = (
  auth = true,
  contentType = HttpContentType.Json
): axios.AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': contentType,
      ...(auth && { Authorization: `Bearer ${getAccessToken()}` }),
    },
  };
};

export const getNetworkConfigMultipartFormData = (
  auth = true,
  contentType = HttpContentType.MultipartFormData
): axios.AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': contentType,
      ...(auth && { Authorization: `Bearer ${getAccessToken()}` }),
    },
  };
};

/**
 * Serves common case for auth=true, content=json with query params
 * No need to serialise params manually
 * @param params
 * @param auth
 * @param contentType
 * @returns
 */
export const getConfigWithParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any,
  auth = true,
  contentType = HttpContentType.Json
): axios.AxiosRequestConfig => {
  return {
    params,
    ...getNetworkConfig(auth, contentType),
  };
};

/**
 * Can be used if custom config is required.
 * More options can be added overtime to override interface
 * @param config
 * @returns
 */
export const overrideNetworkConfig = (config: OverrideNetworkConfig): axios.AxiosRequestConfig => {
  const type = config.contentType ? config.contentType.toString() : HttpContentType.Json;
  const headers = {
    'Content-Type': type,
    ...(config.auth && { Authorization: `Bearer ${getAccessToken()}` }),
    ...(config.responseType && { responseType: config.responseType }),
  };
  return {
    headers,
    ...(config.params && { params: config.params }),
  };
};

export const getAxiosInstance = (): axios.AxiosInstance => {
  const instance = AxiosInstance;
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: axios.AxiosError) => {
      if (error.response) {
        if (
          error.response.status === 500 &&
          (error.response.data as { message: string }).message.includes(
            'Access Token has been revoked'
          )
        ) {
          return;
        }
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        
      }
    }
  );
  return instance;
};
