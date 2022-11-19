import axios, { AxiosInstance } from "axios";

abstract class IAPI {
  protected readonly client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    })
  }
}

export default IAPI
