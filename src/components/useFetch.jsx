import { useState, useEffect } from "react";

const useFetch = (url, categoryId) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log("Error en el fetch: ", error);
      }
    };
    fetchData();
  }, [categoryId]);

  return data;
};

export default useFetch;
