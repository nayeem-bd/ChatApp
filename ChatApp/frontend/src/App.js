import { Route, Switch,Redirect } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import Login from './components/login';
import SignUp from './components/signup';
import Home from './components/home';
import { isLoggedIn } from './utils/auth';

function App() {
  const [isLogged, setisLogged] = useState();

  const checkLogged = async ()=>{
    const data = await isLoggedIn();
    setisLogged(data);
    //console.log(data);
  }

  useEffect(()=>{
    checkLogged();
  },[]);

  return (
    <Switch>
      <Route path="/login" render={()=> isLogged?<Redirect to="/" />:<Login/>}/>
      <Route path="/signup" render={()=>isLogged?<Redirect to="/" />:<SignUp/>}/>
      <Route path="/" render={()=>isLogged===0?<Redirect to="/login" />:<Home/>}/>
    </Switch>
  );
}

export default App;
