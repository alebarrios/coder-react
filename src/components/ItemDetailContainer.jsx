import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const data = useFetch('../src/data/products.json', id);
  const item = data.products?.find((product) => product.id === parseInt(id));

  return (
   item ? <div className="flex justify-center m-4"><ItemDetail item={item} /></div> :
   <div>Cargando...</div>
  );
};

export default ItemDetailContainer;

