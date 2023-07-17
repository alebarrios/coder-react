import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data));
    };
    fetchData();
  }, [url]);

  return [data];
};

export default useFetch;
