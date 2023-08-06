import { useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { getTotalItems } = useContext(CartContext);

  return (
    <div className="relative">
      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      <span className="absolute top-3 left-4 p-1 text-xs">{ getTotalItems() }</span>
    </div>);
};

export default CartWidget;
