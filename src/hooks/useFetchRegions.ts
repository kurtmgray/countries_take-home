import { useState, useEffect } from "react";

export function useFetchRegions() {
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const mockFetch = () => {
        setTimeout(() => {
          setRegions(["Northern Europe", "Southern Europe", "Eastern Europe", "Western Europe"]);
          setLoading(false);
        }, 1000);
      };
  
      mockFetch();
    }, []);
  
    return { regions, loading };
  }