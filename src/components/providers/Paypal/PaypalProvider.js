import React, {useEffect,useState,useReducer} from "react";
import {withRouter,useHistory } from 'react-router-dom';
import { useMutation, useApolloClient} from '@apollo/react-hooks';
import {CREATE_PAYPAL_TRANSACTION} from '../../Mutations/graphql';
import {GET_PLAN,GET_USER,GET_ROUTE,GET_TRANSACTION} from '../../../apollo/queries';
import {rounNumberToPresision} from '../../utilities/';


const PaypalProvider = (props) => {

  const client = useApolloClient();
  const cacheUserData = client.readQuery({query:GET_USER});
  const cachePlan = client.readQuery({query:GET_PLAN});
  const cacheRoute = client.readQuery({query:GET_ROUTE});
  const {plan} = cachePlan;
  const {user:{email,userId}} = cacheUserData;
  const {route} = cacheRoute;

  const [createPaypalTransaction] = useMutation(CREATE_PAYPAL_TRANSACTION);
  

  const uploadPaypalTransaction = async (data) => {
    
    const variables = {
      userId: userId,
      status: plan === 'free' 
          ? data.status 
          : data.status.toUpperCase() == 'COMPLETED' ? 'active' : 'failed',
      amount: plan === 'free'
          ? data.billing_info.last_payment.amount.value
          : ''+rounNumberToPresision(+data.purchase_units[0].amount.value,1),
      quantity: plan === 'free' ? +data.quantity : 1,
      subscriptionId: data.id,
      subscriptionPlan: "Basic",
      subscriberFirstName: plan === 'free'
          ? data.subscriber.name.given_name
          : data.payer.name.given_name,
      subscriberLastName: plan === 'free' 
          ? data.subscriber.name.surname
          : data.payer.name.surname,
      subscriberEmail: plan === 'free'
          ? data.subscriber.email_address
          : data.payer.email_address,
      planId:  plan === 'free'
          ? data.plan_id
          : 'sjinetstreaming',
      gateway: "Paypal",
      recurring: plan === 'free' ? "true" : "false",
      startDate: plan === 'free' 
          ? data.billing_info.last_payment.time
          : data.create_time,
      dueDate: plan === 'free'
          ? data.billing_info.next_billing_time
          : data.create_time,
      createdAt: plan === 'free' 
          ? data.billing_info.last_payment.time
          : data.create_time
    }
    
      try{
        
        const { data, errors} = await createPaypalTransaction({
          variables,
          errorPolicy:'all',
          
          update: (client, { data: {createTransaction}}) => {
            if(route === 'billing') {
            const newTrans = createTransaction.transaction;
            const userData = client.readQuery({ query: GET_USER });
            const transdata = client.readQuery({ query: GET_TRANSACTION });
            const user = {...userData.user, billing:createTransaction.billing};
            const transaction = [...transdata.transaction, newTrans];
            client.writeData({data:{user,transaction}});
            }
            
          }
          
        });

        if (errors) {
          console.log(errors[0].message);
          
        }

        const {createTransaction} = data;
        //console.log(createTransaction);
              
      }catch(e){
        console.log(e.message);     
        
      }
       
    }

const input = {
  plan,
  email,
  route
}


return (
    props.children({
      input,
      uploadPaypalTransaction: (data) => uploadPaypalTransaction(data),
    })
);
    
};

export default PaypalProvider;
