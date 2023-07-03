import './App.css';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  const greeting = "Hola, bienvenid@ a mi tienda!";
  return (
    <>
      <Navbar />
      <ItemListContainer greeting={greeting}/>
    </>
  );
}

export default App;
