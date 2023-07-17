import React from "react";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { id } = useParams();
  return <div>Soy ItemDetailContainer mostrando el item { id }</div>;
};

export default ItemDetailContainer;
