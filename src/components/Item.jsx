import React from 'react';

const Item = ({id, name, price, image, description, category, quantity}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{id}</p>
      <p>{price}</p>
      <p>{category}</p>
      <p>{quantity}</p>
      <img src={'/' + image} alt={name} />
      <p>{description}</p>
    </div>
  );
};

export default Item;
