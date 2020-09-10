import React, {useEffect,useState} from "react";
import {withRouter,useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {LOGIN_USER} from '../../Mutations/graphql';
import store from 'storejs';


const LoginProvider = (props) => {

  const History = useHistory();
  const client = useApolloClient();

  const [login] = useMutation(LOGIN_USER);

  const [email,setEmail] = useState('');
  const [toast,setToast] = useState({});
  const [displaytoast, setDisplayToast] = useState(false);
	const [password,setPassword] = useState('');
	const [emailErr,setEmailErr] = useState('');
	const [passwordErr,setPasswordErr] = useState('');
	const [responseErr,setResponseErr] = useState('');	
	const [emailClean,setEmailClean] = useState(false);
	const [passwordClean,setPasswordClean] = useState(false);	
	const [displayFormm,setDisplayFormm] = useState('login');			
	const [isLoadedSoft,setIsLoadedSoft] = useState(true);
	//const [isLoadedSend,setIsLoadedSend] = useState(true);		

  const displayToast = () => {
    setDisplayToast(true);
    setTimeout(() => {
      setDisplayToast(false);
    }, 4000);
  }

  const handlEmailErr = (value) => {
	
    if(value == ''){
			setEmailErr('Input Email Address');
			setEmailClean(false);	

    }else{
			setEmailErr('');
			setEmailClean(true);
	  }
}

const handlPassErr = (value) => {
	
    if(value == ''){
			setPasswordErr('Input Password');
			setPasswordClean(false);	
    }else{
			setPasswordErr('');
			setPasswordClean(true);
   }
}

const handleEmailChange = (event) => {
    const {target} = event;
		const value = target.value;
		setEmail(value);
		setResponseErr('');
    handlEmailErr(value);
}

const handlePasswordChange = (event) => {
  const {target} = event;
  const value = target.value;
  setPassword(value);
  setResponseErr('');
  handlPassErr(value);
}

const handleSubmit = async (event) => {

  event.preventDefault();
  handlEmailErr(email);
  handlPassErr(password);
  
  if ((emailClean && passwordClean == true) ){
  
    const variables = {
      email,
      passPhrase:password
    }
  
    try{
      setIsLoadedSoft(false);
      const { data, errors} = await login({variables,errorPolicy:'all'});
      setIsLoadedSoft(true);
  
      if (errors) {
        setToast({status:'errorRes', text: errors[0].message});
        displayToast();
        return null;
     }
      
      const {token,user,transaction,history,queue,liked} = data.loginUser;
      store.set('user', { userid: user.userId });
      store.set('Token', { token });
      
      client.writeData({data:{ user,transaction,history,queue,likes:liked} });
      
      const searchParam = '/movies/'; 
      History.push(searchParam);
      	
    
    }catch(e){
      setToast({status:'errorRes', text: 'Bad Request. Try again.'});
      console.log(e.message);     
      setIsLoadedSoft(true);
    }
  }
    
  }

const input = {
  email,
  password,
  emailErr,
  passwordErr,
  responseErr,
  isLoadedSoft,
  displayFormm,
  toast,
  displaytoast,
}


return (
    props.children({
      input,
      handlePasswordChange: (event) => handlePasswordChange(event),
      handleEmailChange: (event) => handleEmailChange(event),
      handleSubmit: (event) => handleSubmit(event),
    })
);
    
};

module.exports = withRouter (LoginProvider);
