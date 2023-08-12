import React from "react";
import { NavLink } from "react-router-dom";

const Item = ({ id, title, price, img, category, stock }) => {
  return (
    <>
      <NavLink to={"/item/" + id} className="flex-auto max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={"/" + img}
          alt={title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
          ARS ${price}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{category}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Stock: {stock}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{id}
          </span>
        </div>
      </NavLink>
    </>
  );
};

export default Item;
