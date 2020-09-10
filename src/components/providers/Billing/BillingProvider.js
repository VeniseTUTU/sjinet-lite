import React, {useEffect,useState,useRef} from "react";
import store from 'storejs';
import {withRouter,useHistory } from 'react-router-dom';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import {CANCEL_SUBSCRIPTION} from '../../Mutations/graphql';
import {GET_TRANSACTION,GET_USER} from '../../../apollo/queries';


const BillingProvider = ({match,children}) => {

  const history = useHistory();
  const client = useApolloClient();
  const cacheUserData = client.readQuery({query:GET_USER});
  const cacheTransactionData = client.readQuery({query:GET_TRANSACTION});
  const [CancelSubscription] = useMutation(CANCEL_SUBSCRIPTION);

  const {billing:{subscriptionId}} = cacheUserData.user;
  const {transaction} = cacheTransactionData;
  const activeSubscription = transaction.find((trans) => trans.subscriptionId === subscriptionId)
  
  const [results, setResults] = useState([]);
  const [isLoadedSoft,setIsLoadedSoft] = useState(false);
  const [toast,setToast] = useState({});
  const [displaytoast, setDisplayToast] = useState(false);

  const displayToast = () => {
    setDisplayToast(true);
    setTimeout(() => {
      setDisplayToast(false);
    }, 4000);
  }
  
  const lauchCheckout = (e) => {
    client.writeData({data:{ plan:'free', route:'billing'} });
    const searchParam = '/paypal-checkout/'; 
    history.push(searchParam);
  }
  
  const lauchCheckoutRecuring = (e) => {
    client.writeData({data:{ plan:'renew', route:'billing'} });
    const searchParam = '/paypal-checkout/'; 
    history.push(searchParam);
  }
  
  const cancelSubscription = async (value) => {
    
    const variables = {
      subscriptionId: value,
    }
    try{
      setIsLoadedSoft(true);
      const { data, errors} = await CancelSubscription({variables,errorPolicy:'all'});
      setIsLoadedSoft(false);
  
      if (errors) {
         setToast({status:'errorRes', text: errors[0].message});
         displayToast();
         return null;
      }
      
      const {transaction} = data.cancelSubscription;
      setToast({status:'successResGrn', text:'Successful'});
      displayToast();
          
    }catch(e){
      setToast({status:'errorRes', text: 'Bad Request. Try again later.'});
      console.log(e.message);     
      setIsLoadedSoft(false);
    }
	}

  const Input = {
    toast,
    isLoadedSoft,
    displaytoast,
  }
 

return (
    children({
      Input,
      cacheTransactionData,
      activeSubscription,
      lauchCheckout,
      lauchCheckoutRecuring,
      cancelSubscription: (value) => cancelSubscription(value)
    })
);
    
};

module.exports = withRouter (BillingProvider);
