import axios, { AxiosInstance } from "axios";

abstract class IAPI {
  protected readonly client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    })
  }
}

export default IAPI
