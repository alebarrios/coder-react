import useFetch from './useFetch';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const data = useFetch('../src/data/products.json', categoryId);

  const filterData = categoryId ?
        data.products?.filter((product) => product.category === categoryId) :
        data?.products;

  return (
    <ItemList products={filterData}/>
  );
};

export default ItemListContainer;

