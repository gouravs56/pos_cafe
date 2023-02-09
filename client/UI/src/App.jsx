import 'antd/dist/reset.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import BillsPage from './pages/BillsPage';
import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<HomePage/>} />
       <Route path="/items" element={<ItemPage/>} />
       <Route path="/cart" element={<CartPage/>} />
       <Route path="/bills" element={<BillsPage/>} />
       <Route path="/customers" element={<CustomerPage/>} />
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
