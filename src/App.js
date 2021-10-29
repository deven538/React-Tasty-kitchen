import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import SpecificRestaurantDetails from './components/SpecificRestaurantDetails'
import Cart from './components/Cart'
import Payment from './components/Payment'

import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={SpecificRestaurantDetails}
          />
          <ProtectedRoute exact path="/Cart" component={Cart} />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
