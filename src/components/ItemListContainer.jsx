import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getFirestore, getDocs, collection, query, where} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState();

  const getItems = (category) => {
    const db = getFirestore();
    const queryCollection = category ?
      query(collection(db, 'items'), where("category", "==", category)) :
      collection(db, 'items');
    getDocs(queryCollection).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log('No hay productos en Firestore!');
      }
      setItems(
          querySnapshot.docs.map((doc) => ( { id: doc.id, ...doc.data() } )));
    }).catch((error) => {
      console.log('Error buscando en Firestore: ', error);
    });
  };

  useEffect(() => {
    getItems(categoryId);
  }, [categoryId]);

  return (
    <ItemList products={items}/>
  );
};

export default ItemListContainer;

