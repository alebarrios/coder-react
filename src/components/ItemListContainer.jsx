import React from 'react';

const ItemListContainer = (props) => {
  return (
    <div className='bg-orange-600 text-center text-4xl text-slate-200 m-4 p-4 max-w-[80%] mx-auto rounded-xl'>{props.greeting}</div>
  );
};

export default ItemListContainer;
