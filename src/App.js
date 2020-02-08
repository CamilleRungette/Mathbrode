import React, {Component} from 'react';
import './App.css';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './components/dashboard';
import Stock from './components/dashboardComponents/stock';
import Tracking from './components/dashboardComponents/orderTracking';
import Messaging from './components/dashboardComponents/messaging';
import Login from './components/Login';
import Classes from './components/Classes'
import Events from './components/Events'
import Basket from './components/Basket'
import ItemPres from './components/ItemPresentation'
import Items from './components/Items'
import Creations from './components/Creations'
import MyOrders from './components/Myorders'
import {createStore, combineReducers}  from 'redux';
import {Provider} from 'react-redux';
import Profil from './components/Profil';
import LoginAdmin from './components/LoginAdmin'
import user from './components/Reducer/user.reducer';
import item from './components/Reducer/cart.reducer'
import admin from './components/Reducer/admin.reducer'
import total from './components/Reducer/order.reducer'
import CheckoutForm from './components/StripeCheckout';

const store = createStore(combineReducers({user, item, admin, total}));



class App extends Component{
  render(){
    return (
      
     <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/stock" component={Stock} />
          <Route path="/orderTracking" component={Tracking} />
          <Route path="/messaging" component={Messaging} />
          <Route path="/login" component={Login}  />
          <Route path="/classes" component={Classes} />
          <Route path="/events" component={Events} />
          <Route path="/basket" component={Basket} />
          <Route path="/item/:id" exact component={ItemPres}/>
          <Route path="/items" component={Items} />
          <Route path="/creations" component={Creations}/>
          <Route path="/myorders" component={MyOrders} />
          <Route path="/loginadmin" component={LoginAdmin} />  
          <Route path="/profil" component={Profil} />
          <Route path="/checkout" component={CheckoutForm} />     
        </Switch>
      </Router>  
    </Provider>

  )}
}

export default App;
