import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';

import GamePost from './Components/gamePost';
import Auth from './Components/auth';
import About from './Components/about';
import Privacy from './Components/privacy';
import GameForm from './Components/gameForm';



function App() {
 

// showing current user
// const showCurrentUser = ()=>{
// return currentPath !== '/' && currentPath !== '/auth' ? (
//     // Content to render when the location is not "/" or "/auth"
//      <CurrentUser />
//   ) :  null
// }

  return (
    <div className='full-app'>
   <Routes>
    <Route index path='https://gamesratingbypublic.web.app/' element={<Home />}></Route>
    <Route path='https://gamesratingbypublic.web.app//gameform' element={<GameForm />}></Route>
    <Route path="https://gamesratingbypublic.web.app//auth" element={<Auth />}></Route>
    <Route path="https://gamesratingbypublic.web.app//gamePost" element={<GamePost />}></Route>
    <Route path='https://gamesratingbypublic.web.app//about' element={<About />}></Route>
    <Route path="https://gamesratingbypublic.web.app//privacy" element={<Privacy />}></Route>
   </Routes>
   </div>
  );
}

export default App;
