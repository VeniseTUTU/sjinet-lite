import React, {useEffect,useState,useReducer} from "react";
import {withRouter,useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {SIGNUP_USER} from '../../Mutations/graphql';
import {reducer,statedata} from '../../uiSources/formReducer';
import store from 'storejs';


const LoginProvider = (props) => {
const [signup] = useMutation(SIGNUP_USER);

const client = useApolloClient();
const history = useHistory();

const [state,dispatch] = useReducer(reducer,statedata);
const [responseErr,setResponseErr] = useState('');
const [displayLoginDetailsform,setDisplayLoginDetailsForm] = useState(true);
const [displayPersonDetailsform,setDisplayPersonDetailsForm] = useState(false);			
const [isLoadedSoft,setIsLoadedSoft] = useState(true);

const {firstnameErr,lastnameErr,genderErr,phoneErr,emailErr,passwordErr,password2Err,countryErr,} = state;

const handleChange = (e) => {
		const {value,name} = e.target;
		dispatch({type:name, payload: value});
}

const handleSubmit = async (event) => {

  event.preventDefault();
		const fields = ['firstname','lastname','gender','country'];
		let obj={};
		fields.map((field) => {
      obj[field] = state[field] || '';
		});
		//console.log(obj);
		await dispatch({type:`submit`, payload: obj});
  
    if(state.submit){
  
    const variables = {
      email: store.has('user') ? store.get('user').email : '',
      passPhrase: store.has('user') ? store.get('user').pass : '',
      phone: state.phone,
      firstName: state.firstname,
      lastName: state.lastname,
      country: state.country,
      gender: state.gender.toUpperCase(),
      touchPoint: state.touchpoint
    }
  
    try{
      setIsLoadedSoft(false);
      const { data, errors} = await signup({variables,errorPolicy:'all'});
      setIsLoadedSoft(true);
  
      if (errors) return setResponseErr(errors[0].message);
      
      const {user} = data.addUser;
      client.writeData({data:{ plan:'free', route:'register', user} });
       const searchParam = '/paypal-checkout/'; 
      history.push(searchParam);
    
    }catch(e){
      setResponseErr('Bad Request. Try again later.');
      console.log(e.message);     
      setIsLoadedSoft(true);
    }
  }
    
  }
  

const handleLoginDetailSubmit = async (event) => {

  event.preventDefault();
		const fields = ['email','password','password2'];
		let obj={};
		fields.map((field) => {
      obj[field] = state[field] || '';
		});
		await dispatch({type:`submit`, payload: obj});
  
    if(state.submit){
      store.set('user', { email: state.email, pass: state.password});
      setDisplayPersonDetailsForm(true);
      setDisplayLoginDetailsForm(false);
    }
    
  }

const input = {
  
  responseErr,
  isLoadedSoft,
  firstnameErr,
  lastnameErr,
  genderErr,
  phoneErr,
  emailErr,
  passwordErr,
  password2Err,
  countryErr,
  displayLoginDetailsform,
  displayPersonDetailsform,
}


return (
    props.children({
      input,
      handleChange: (event) => handleChange(event),
      handleSubmit: (event) => handleSubmit(event),
      handleLoginDetailSubmit: (event) => handleLoginDetailSubmit(event),
    })
);
    
};

module.exports = withRouter (LoginProvider);
