import './App.css';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <Navbar />
      <ItemListContainer greeting={"hola"}/>
    </h1>
  );
}

export default App;
