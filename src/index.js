import React, {Suspense,lazy} from "react";
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client }  from './apollo/config';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Loader from './components/uiSources/loading';

const FrontPage = lazy(() => import(/* webpackChunkName: 'FrontPage' */ './components/containers/frontPage'));
const TvSeries = lazy(() => import(/* webpackChunkName: 'TvSeries' */ './components/containers/tvseries'));
const Moviespage = lazy(() => import(/* webpackChunkName: 'Moviespage' */ './components/containers/movies'));
const Productpage = lazy(() => import(/* webpackChunkName: 'Productpage' */ './components/containers/product'));
const Billingpage = lazy(() => import(/* webpackChunkName: 'Billingpage' */ './components/containers/billing-setting'));
const Usersettingpage = lazy(() => import(/* webpackChunkName: 'Usersettingpage' */ './components/containers/account-setting'));
const Theaterpage = lazy(() => import(/* webpackChunkName: 'Theaterpage' */ './components/containers/theater'));
const Librarypage = lazy(() => import(/* webpackChunkName: 'Librarypage' */ './components/containers/library'));
const Registerpage = lazy(() => import(/* webpackChunkName: 'Registerpage' */ './components/containers/register'));
const Loginpage = lazy(() => import(/* webpackChunkName: 'Loginpage' */ './components/containers/login'));
const PaypalCheckout = lazy(() => import(/* webpackChunkName: 'PaypalCheckout' */ './components/containers/paypal-checkout'));
const Passwordresetpage = lazy(() => import(/* webpackChunkName: 'Passwordresetpage' */ './components/containers/passwordreset'));
const Confirmemail = lazy(() => import(/* webpackChunkName: 'Confirmemail' */ './components/containers/confirmemail'));

ReactDOM.render(
  <ApolloProvider client={client} >
  <Suspense fallback={<Loader />}>
     <Router basename="/">
     <Switch>
         <Route exact path="/" component={FrontPage} />
         <Route path="/watch/:id" render={(props) => <Productpage {...props} />}/>
         <Route  path="/movies/" component={Moviespage} />
         <Route  path="/tvseries" component={TvSeries} />
         <Route  path="/billing-setting" component={Billingpage} />
         <Route  path="/account-setting" component={Usersettingpage} />
         <Route  path="/theater/:id" component={Theaterpage} />
         <Route  path="/library" component={Librarypage} />
         <Route  path="/signup" component={Registerpage} />
         <Route  path="/login" component={Loginpage} />
         <Route  path="/paypal-checkout" component={PaypalCheckout} />
         <Route  path="/password-reset" component={Passwordresetpage} />
         <Route  path="/confirm-email" component={Confirmemail} />
         </Switch> 
      </Router>
      </Suspense>
      </ApolloProvider>, 
  
    document.getElementById('app')
)

