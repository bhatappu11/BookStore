import './App.css';
import Account from './pages/account/Account';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
// import 

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Account />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
