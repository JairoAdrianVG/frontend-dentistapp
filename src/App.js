import './App.css';
import './index.css';
import { useAuth0 } from '@auth0/auth0-react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListPatients from './components/ListPatients';
import ShiftsComponent from './components/ShiftsComponent'
import NavbarMenu from './components/NavbarMenu';
import StorageComponent from './components/StorageComponent';
import HomePageNews from './components/HomePageNews';
import Odontogram from './components/Odontogram';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';

function App() {
  const {isAuthenticated} = useAuth0(); 
  return (
      <Router>
        <div className='container-app'>
          <NavbarMenu />
            <div className="container">
            <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/user' element={<Profile />}></Route>
            <Route path='/#' element={<Logout />}></Route>
            <Route path='/pdf' element={<Odontogram />}></Route>
            <Route path='/home' element={<HomePageNews />}></Route>
            <Route path='/patients' element={<ListPatients />}></Route>
            <Route path='/storage' element={<StorageComponent/>}></Route>
            <Route path='/shifts' element={<ShiftsComponent />}></Route>
            </Routes>
            </div>
        </div>
      </Router>
  );
}

export default App;
