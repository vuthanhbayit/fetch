import type { AxiosInstance, CancelTokenSource } from "axios";
import Axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    cancelId?: string;
  }
}

export function createAxiosCancel(axios: AxiosInstance) {
  const cancelTokenMap = new Map<string, CancelTokenSource>();

  axios.interceptors.request.use((config) => {
    const { cancelId } = config;

    if (cancelId) {
      const oldSource = cancelTokenMap.get(cancelId);
      if (oldSource) {
        oldSource.cancel(cancelId);
      }

      // eslint-disable-next-line import/no-named-as-default-member
      const newSource = Axios.CancelToken.source();
      config.cancelToken = newSource.token;
      cancelTokenMap.set(cancelId, newSource);
    }

    return config;
  });

  axios.interceptors.response.use((response) => {
    const { cancelId } = response.config;

    if (cancelId) {
      cancelTokenMap.delete(cancelId);
    }

    return response;
  });
}
