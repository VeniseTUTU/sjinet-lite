import React, {useEffect,useState,useReducer} from "react";
import {withRouter,useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {SET_CODE,VERIFY_CODE,SET_PASSWORD} from '../../Mutations/graphql';
import {reducer,statedata} from '../../uiSources/formReducer';
import store from 'storejs';


const PasswordResetProvider = (props) => {

  const History = useHistory();
  const client = useApolloClient();

   const [setcode] = useMutation(SET_CODE);
   const [verifycode] = useMutation(VERIFY_CODE);
   const [setpassword] = useMutation(SET_PASSWORD);

const [state,dispatch] = useReducer(reducer,statedata);
const [data,setData] = useState('');
const [toast,setToast] = useState({});
const [displaytoast, setDisplayToast] = useState(false);
const [displayemail,setdisplayemail] = useState(true);
const [displaycode,setdisplaycode] = useState(false);
const [displaypassword,setdisplaypassword] = useState(false);		
const [dispalysuccess,setdispalysuccess] = useState(false);	
const [isLoadedSoft,setIsLoadedSoft] = useState(true);

const {emailErr,codeErr,passwordErr,password2Err,} = state;

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

const handleEmailSubmit = async (event) => {

  event.preventDefault();
		const fields = ['email'];
		let obj={};
		fields.map((field) => {
      obj[field] = state[field] || '';
		});
		//console.log(obj);
    await dispatch({type:`submit`, payload: obj});
    
  
    if(state.submit){
  
    const variables = {
      email: state.email,
    }
  
    try{
      setIsLoadedSoft(false);
      const { data, errors} = await setcode({variables,errorPolicy:'all'});
      setIsLoadedSoft(true);
  
      if (errors) {
         setToast({status:'errorRes', text: errors[0].message});
         displayToast();
         return null;
      }
      
      const {nodes} = data.setCode;
      setData(nodes);
      setdisplayemail(false);
      setdisplaycode(true);
    
    }catch(e){
      setToast({status:'errorRes', text: 'Bad Request. Try again later.'});
      console.log(e.message);     
      setIsLoadedSoft(true);
    }
    }
    
  }

  const handleCodeSubmit = async (event) => {

    event.preventDefault();
      const fields = ['code'];
      let obj={};
      fields.map((field) => {
        obj[field] = state[field] || '';
      });
      //console.log(obj);
      await dispatch({type:`submit`, payload: obj});
      if(state.submit){
  
        const variables = {
          email: data.email,
          code: state.code,
        }
      
        try{
          setIsLoadedSoft(false);
          const { data, errors} = await verifycode({variables,errorPolicy:'all'});
          setIsLoadedSoft(true);
      
          if (errors) {
             setToast({status:'errorRes', text: errors[0].message});
             displayToast();
             return null;
          }
          
          const {nodes} = data.verifyCode;
          setData(nodes);
          setdisplaycode(false);
          setdisplaypassword(true);
        
        }catch(e){
          setToast({status:'errorRes', text: 'Bad Request. Try again later.'});
          console.log(e.message);     
          setIsLoadedSoft(true);
        }
        }
      
    }

    const handlePasswordSubmit = async (event) => {

      event.preventDefault();
        const fields = ['password','password2'];
        let obj={};
        fields.map((field) => {
          obj[field] = state[field] || '';
        });
        //console.log(obj);
        await dispatch({type:`submit`, payload: obj});
        if(state.submit){
  
          const variables = {
            userId: data.userId,
            code: data.code,
            password: state.password
          }
        
          try{
            setIsLoadedSoft(false);
            const { data, errors} = await setpassword({variables,errorPolicy:'all'});
            setIsLoadedSoft(true);
        
            if (errors) {
               setToast({status:'errorRes', text: errors[0].message});
               displayToast();
               return null;
            }
            
            setdisplaypassword(false);
            setdispalysuccess(true);
          
          }catch(e){
            setToast({status:'errorRes', text: 'Bad Request. Try again later.'});
            console.log(e.message);     
            setIsLoadedSoft(true);
          }
          }
        
      }
  

const input = {
  toast,
  isLoadedSoft,
  emailErr,
  codeErr,
  passwordErr,
  password2Err,
  displayemail,
  displaycode,
  displaypassword,
  dispalysuccess,
  displaytoast,
}


return (
    props.children({
      input,
      handleChange: (event) => handleChange(event),
      handleEmailSubmit: (event) => handleEmailSubmit(event),
      handleCodeSubmit: (event) => handleCodeSubmit(event),
      handlePasswordSubmit: (event) => handlePasswordSubmit(event),
    })
);
    
};

module.exports = withRouter (PasswordResetProvider);
