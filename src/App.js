import './App.css';
import Account from './pages/account/Account';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Account />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
