import React from "react";
import Item from "./Item";

const ItemList = ({products}) => {
  return (
    <div className='flex flex-wrap justify-center text-center text-4xl m-4 p-4 mx-auto rounded-xl'>
      {
        products && products.map((product) => {
          return (
            <Item key={product.id} {...product} />
          );
        })
      }
    </div>
  );
};

export default ItemList;
