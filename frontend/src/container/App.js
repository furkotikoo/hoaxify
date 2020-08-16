import React from 'react';
import ApiProgress from '../shared/ApiProgress';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';

const App = () => {

  const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn })); // login durumdayken login sayfası açılmayacak

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          {!isLoggedIn && (<Route path="/login" component={LoginPage}></Route>)}
          <Route path="/signup" component={UserSignupPage}></Route>
          <Route path="/user/:username" component={UserPage}></Route>
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  );
}

export default App;