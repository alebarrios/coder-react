import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState();

  const getSelectedItem = async (idItem) => {
    try {
      const db = getFirestore();
      const document = doc(db, "items", idItem);
      const resp = await getDoc(document);
      const resultItem = { id: resp.id, ...resp.data() };
      setSelectedItem(resultItem);
    } catch (error) {
      console.log("Error al leer doc en Firebase: ", error);
    }
  };

  useEffect(() => {
    getSelectedItem(id);
  }, [id]);

  return selectedItem ? (
    <div className="flex justify-center m-4">
      <ItemDetail item={selectedItem} />
    </div>
  ) : (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Cargando...
        </span>
      </div>
    </div>
  );
};

export default ItemDetailContainer;

