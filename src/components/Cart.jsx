import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeItem } = useContext(CartContext);
  console.log("En cart: ", cart);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="text-lg font-medium text-gray-900">
            Carrito
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              { !cart.length ? <p className="mt-0.5 text-sm text-gray-500">No hay artículos en el carrito.</p>:
              cart.map((product) => (
                <li key={product.item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={"/" + product.item.image}
                      alt={"Imagen de producto de" + product.item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">{product.item.name}</a>
                        </h3>
                        <p className="ml-4">$ {numberWithCommas(product.item.price * product.quantity)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        $ {numberWithCommas(product.item.price)}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Cant. {product.quantity}</p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => removeItem(product.item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${numberWithCommas(
              cart.reduce((acum, i) => i.item.price + acum, 0))}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Todos los cargos e impuestos incluidos.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            o{" "}
            <Link to={"/"}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue mirando
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
