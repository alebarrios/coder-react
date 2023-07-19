import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {
  console.log("Inicia ItemListContainer");
  const { categoryId } = useParams();
  const data = useFetch('../src/data/products.json', categoryId);

  const filterData = categoryId ?
        data.products?.filter((product) => product.category === categoryId) :
        data?.products;

  console.log("data es", filterData);
  return (
    <ItemList products={filterData}/>
  );
};

export default ItemListContainer;

// tengo que ir a buscar la data cuando se actualiza el useParams dentro de un useEffect
// En ItemListContainer va el filter
// En ItemList va el map
