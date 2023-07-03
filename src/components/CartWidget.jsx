import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const CartWidget = () => {
  return (
    <div className="relative">
      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      <span className="absolute top-3 left-4 p-1 text-xs">0</span>
    </div>);
};

export default CartWidget;
