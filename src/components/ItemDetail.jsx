import React, { useContext } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    const itemToAdd = {
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
    };
    addItem(itemToAdd, quantity);
  };


  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[80%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={"/" + item.img} alt=""/>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        <span className="text-3xl font-bold text-gray-900 dark:text-white my-2">$ {item.price}</span>
        <ItemCount stockItems={item.stock} onAdd={handleOnAdd}/>
      </div>
    </div>
  );
};

export default ItemDetail;
