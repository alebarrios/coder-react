import React from 'react';
import useFetch from './useFetch';
import Item from './Item';

const ItemListContainer = () => {
  const [data] = useFetch('../src/data/products.json');

  return (
    <div className='bg-orange-600 text-center text-4xl text-slate-200 m-4 p-4 max-w-[80%] mx-auto rounded-xl'>
      {
        data && data.products.map((product) => {
          return (
            <Item key={product.id} {...product} />
          );
        })
      }

    </div>
  );
};

export default ItemListContainer;
