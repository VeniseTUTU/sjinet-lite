import React, {useEffect,useState,useReducer} from "react";
import {withRouter,useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {UPDATE_USER_DETAILS,UPDATE_PASSWORD} from '../../Mutations/graphql';
import store from 'storejs';
import {GET_USER} from '../../../apollo/queries';
import {reducer,statedata} from '../../uiSources/formReducer';

const LoginProvider = (props) => {

  const client = useApolloClient();

  const [updatedetails] = useMutation(UPDATE_USER_DETAILS);
  const [updatepassword] = useMutation(UPDATE_PASSWORD);
  const cacheUserData = client.readQuery({query:GET_USER});

  const [state,dispatch] = useReducer(reducer,statedata);
  const [toast,setToast] = useState({});
  const [displaytoast, setDisplayToast] = useState(false);
  const [detLoading,setDetLoading] = useState(false);
  const [passLoading,setPassLoading] = useState(false);

  const {firstnameErr,lastnameErr,phoneErr,emailErr,passwordErr,newpasswordErr} = state;

const displayToast = () => {
	setDisplayToast(true);
	setTimeout(() => {
		setDisplayToast(false);
	}, 4000);
}

const handleChange = (e) => {
  const {value,name} = e.target;
  dispatch({type:name, payload: value});
}

const handleDetailsSubmit = async (event) => {

  event.preventDefault();
    const fields = ['firstname','lastname','phone'];
    const {user:{viewer:{firstName,lastName,phone}}} = cacheUserData;
    const defaultValue = {firstname:firstName,lastname:lastName,phone:phone};
   	let obj={};
		fields.map((field) => {
      obj[field] = state[field] || defaultValue[field];
		});
		/*console.log(obj); */
		await dispatch({type:`submit`, payload: obj});
    
    if(state.submit){
      
    const variables = {
      phone: state.phone,
      firstName: state.firstname,
      lastName: state.lastname,
      
    }
  
    try{
      setDetLoading(true);
      const { data, errors} = await updatedetails({
        variables,
        errorPolicy:'all',
        
        update: (client, { data: {updateViewer}}) => {
        const data = client.readQuery({ query: GET_USER });
        const user = {...data.user, viewer:updateViewer};
        client.writeData({data:{user}});
        
      }
      });
      setDetLoading(false);
  
      if (errors) {
        setToast({status:'BAD', text: errors[0].message});
        displayToast();
        return null;
      }
      
      const {updateViewer} = data;
      setToast({status:'OK', text: 'Successfull! Changes to your account has been completely effected!'});
      displayToast();
      
          
    }catch(e){
      setResponseErr('Bad Request. Try again later.');
      displayToast();
      console.log(e.message);     
      setDetLoading(false);
    }
     
  }
  
  }

  const handlePassSubmit = async (event) => {

    event.preventDefault();
      const fields = ['password','newpassword'];
      let obj={};
      fields.map((field) => {
        obj[field] = state[field] || '';
      });
      /*console.log(obj); */
      await dispatch({type:`submit`, payload: obj});
      
      if(state.submit){
        
      const variables = {
        password: state.password,
        newpassword: state.newpassword,
      }
    
      try{
        setPassLoading(true);
        const { data, errors} = await updatepassword({variables,errorPolicy:'all'});
        setPassLoading(false);
    
        if (errors) {
          setToast({status:'BAD', text: errors[0].message});
          displayToast();
          return null;
        }
        
        
        const {updateViewer} = data;
        setToast({status:'OK', text: 'Successfull! Changes to password has been effected!'});
        displayToast();
            
      }catch(e){
        setToast({status:'BAD', text: 'Bad Request. Try again later.'});
        displayToast();
        console.log(e.message);     
        setPassLoading(false);
      }
       
    }
    
    }

const input = {
  firstnameErr,
  lastnameErr,
  phoneErr,
  emailErr,
  passwordErr,
  newpasswordErr,
  toast,
  displaytoast,
  detLoading,
  passLoading,
}

return (
    props.children({
      input,
      cacheUserData,
      handleChange: (e) => handleChange(e),
      handleDetailsSubmit: (event) => handleDetailsSubmit(event),
      handlePassSubmit: (event) => handlePassSubmit(event),
    })
);
    
};

module.exports = withRouter (LoginProvider);
