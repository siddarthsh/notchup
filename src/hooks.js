// hooks.js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setHasLoaded(true);
  }
  useEffect(() => {
    fetchUrl();
  }, [data]);
  return [data, hasLoaded];
}
export { useFetch };
