import React from 'react';
import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import Item from './Item';

const ItemListContainer = () => {
  const [data] = useFetch('../src/data/products.json');
  const { categoryId } = useParams();
  return (
    <div className='bg-orange-600 text-center text-4xl text-slate-200 m-4 p-4 max-w-[80%] mx-auto rounded-xl'>
    Dentro de ItemListContainer, categoryId es { categoryId }
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
