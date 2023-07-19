import { useState, useEffect } from "react";

const useFetch = (url, categoryId) => {
  console.log(`entra a useFetch con ${url}`);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log("Se llama a setData: ", json);
        setData(json);
      } catch (error) {
        console.log("Error en el fetch: ", error);
      }
    };
    console.log("se llama a fetchData");
    fetchData();
  }, [categoryId]);

  console.log("useFetch actualizando: ", data);
  return data;
};

export default useFetch;
