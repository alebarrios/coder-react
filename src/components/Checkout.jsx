import React from "react";
import { useState, useContext } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [buyer, setBuyer] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    city,
    state,
    zipCode,
  } = buyer;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const emailsAreTheSame = (e) => {
    return e.target.email.value === e.target.email2.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !emailsAreTheSame(e) ) {
      e.target.email2.setCustomValidity("Los Emails no coinciden.");
      e.target.email2.reportValidity();
      return;
    }
    const total = cart.reduce((acum, i) => i.item.price + acum, 0);
    const dia = new Date();
    const order = { buyer, cart, total, dia };

    generateOrder(order);
  };

  const generateOrder = async (orderData) => {
    try {
      const db = getFirestore();
      const queryCollection = collection(db, "orders");
      const order = await addDoc(queryCollection, orderData);
      setOrderId(order.id);
      clearCart();
    } catch (error) {
      console.log("Error al generar la orden: ", error);
    }
  };

  const handleInputChange = (e) => {
    e.target.setCustomValidity("");

    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  return !orderId ? (
    <form onSubmit={handleSubmit} className="px-3">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-center sm:text-left text-base font-semibold leading-7 text-gray-900 mb-4">Detalle de la Compra</h2>
          <ul role="list" className="my-4 divide-y divide-gray-200">
            { !cart.length ? <p className="mt-0.5 text-sm text-center sm:text-left text-gray-500">No hay artículos en el carrito.</p>:
            cart.map((product) => (
              <li key={product.item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={"/" + product.item.img}
                    alt={"Imagen de producto de" + product.item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">{product.item.title}</a>
                      </h3>
                      <p className="ml-4">$ {numberWithCommas(product.item.price * product.quantity)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      $ {numberWithCommas(product.item.price)}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Cant. {product.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>${numberWithCommas(
                cart.reduce((acum, i) => i.item.price + acum, 0))}</p>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-5">
          <h2 className="text-center sm:text-left text-base font-semibold leading-7 text-gray-900">Información Personal</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Usa una dirección de correo válida donde puedas recibir un e-mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  autoComplete="given-name"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  autoComplete="family-name"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  autoComplete="phone"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email2" className="block text-sm font-medium leading-6 text-gray-900">
                Repetir Email
              </label>
              <div className="mt-2">
                <input
                  id="email2"
                  name="email2"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Tipo de Factura
              </label>
              <div className="mt-2">
                <select
                  name="invoiceType"
                  id="invoiceType"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Consumidor Final</option>
                  <option>Factura A</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Dirección de Envío
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  value={address}
                  autoComplete="street-address"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                Localidad
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  value={city}
                  autoComplete="address-level2"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                Provincia
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  value={state}
                  autoComplete="address-level1"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Código Postal
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="zipCode"
                  value={zipCode}
                  autoComplete="postal-code"
                  required
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-start mb-2">
        <button disabled={!cart.length}
          type="submit"
          className={classNames(
            !cart.length ?
            "bg-indigo-300" :
            "bg-indigo-600 hover:bg-indigo-700",
            "rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm",
          )}
        >
          Generar Orden
        </button>
      </div>
    </form>
  ) :
  (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">N° de Orden</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{orderId}</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Su orden ha sido generada con éxito.
                En breve será notificado a su contacto telefónico.
                Gracias por confiar en nosotros!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
