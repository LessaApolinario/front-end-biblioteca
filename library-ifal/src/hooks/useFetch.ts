import { useEffect, useState } from "react";

import api from "../services/api";

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T>(url)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchData()
  }, [url])

  return { data }
}