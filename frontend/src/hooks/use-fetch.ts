import { useEffect, useState } from "react";

export function useFetch<T>(
  url: string,
  options?: RequestInit
): { data: T | undefined; isLoading: boolean; error: Error | undefined } {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
}
