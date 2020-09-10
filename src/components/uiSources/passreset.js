import React, {Component} from "react";
import {LoginUser} from '../Mutations';
import store from 'storejs';
import '../../scss/login.scss';
import { NavLink, Link, withRouter } from 'react-router-dom';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL

class Loginform extends React.Component {
        constructor(props){
            super(props);
	    
	this.state={
	    
	   
	   
	    email:'',
			password:'',
			password2:'',
			vericode:'',
	    
	    emailErr:'',
			passwordErr:'',
			password2Err:'',
			vericodeErr:'',
			responseErr:'',
			responseErrMail:'',
			responseErrCode:'',
			responseErrChangePass:'',
	    
	    emailClean: false,
			passwordClean: false,
			password2Clean: false,
			vericodeClean: false,
	         
			displayFormm:'',
			resentCode: false,
			isLoadedSoft: true,
			isLoadedSend:true,
	};
	this.displayInputEmail = this.displayInputEmail.bind(this);
	this.displayLoginForm = this.displayLoginForm.bind(this);
	this.handleEmailChange = this.handleEmailChange.bind(this);
	this.handlePasswordChange = this.handlePasswordChange.bind(this);
	this.handlePassword2Change = this.handlePassword2Change.bind(this);
	this.handleVeriCodeChange = this.handleVeriCodeChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handlePasChangeSubmit = this.handlePasChangeSubmit.bind(this);
	this.handleVeriCodeSubmit = this.handleVeriCodeSubmit.bind(this); 
	this.handlePasswordChangeSubmit = this.handlePasswordChangeSubmit.bind(this);
	this.resendValCode = this.resendValCode.bind(this);
	}

displayInputEmail(){
	this.setState({displayFormm: 'inputEmail'}); 
}
displayLoginForm(){
	this.setState({displayFormm: 'login'}); 
}

handlEmailErr(value){
	
    if(value == ''){	
	this.setState({
	    emailErr:'Input Email Address',
	    emailClean: false,
	})
    }else{
	this.setState({
	    emailErr:'',
	    emailClean: true,
	})
   }
}
handlPassErr(value){
	
    if(value == ''){	
	this.setState({
	    passwordErr:'Input Password',
	    passwordClean: false,
	})
    }else{
	this.setState({
	    passwordErr:'',
	    passwordClean: true,
	})
   }
}
handlPass2Err(value){
	const passValue = this.state.password;
	if(value != passValue){	
this.setState({
		password2Err:'Match Password.',
		password2Clean: false,
})
	}else{
this.setState({
		password2Err:'',
		password2Clean: true,
})
 }
}
handleCodeErr(value){
	
	if(value == ''){	
this.setState({
		vericodeErr:'Input Code',
		vericodeClean: false,
})
	}else{
this.setState({
	  vericodeErr:'',
		vericodeClean: true,
})
 }
}

handleEmailChange(event){
    const {target} = event;
    const value = target.value;
    this.setState({email: value,responseErr:''});
    this.handlEmailErr(value);
}
handlePasswordChange(event){
    const {target} = event;
    const value = target.value;
    this.setState({password: value,responseErr:''});
    this.handlPassErr(value);
}
handlePassword2Change(event){
	const {target} = event;
	const value = target.value;
	this.setState({password2: value,responseErr:''});
	this.handlPass2Err(value);
}
handleVeriCodeChange(event){
	const {target} = event;
	const value = target.value;
	this.setState({vericode: value,responseErr:''});
	this.handleCodeErr(value);
}
handleSubmit(event) {
  event.preventDefault();
const {email,password,emailClean,passwordClean} = this.state;
this.handlEmailErr(email);
this.handlPassErr(password);

if ((emailClean && passwordClean == true) ){

  const data = {
	Email: email,
	Password: password,
}
  
  $.ajax({

        type : "POST",
        url:  process.env.API_URL+"validate/u", 
        data : JSON.stringify(data),
	beforeSend: (data) => {
	 this.setState({isLoadedSoft:false}); 
        },
	success : (response)=> {
	 const returnValue = response.data.reduce((a,b) => Object.assign(a,b), {});
	 store.set('user', { userid:returnValue.UserId });
	 const {history} = this.props;
	 const searchParam = '/movies/'; 
   history.push(searchParam);
	
        },
	error : (err)=> {
	this.setState({isLoadedSoft:true, responseErr: 'Invalid Username and Password',}); 
        }
});
  
  
}

}


handlePasChangeSubmit(event) {

	event.preventDefault();
const {email,emailClean} = this.state;
this.handlEmailErr(email);

if ((emailClean == true) ){

  const data = {
	Email: email
}
  
  $.ajax({

        type : "POST",
        url:  process.env.API_URL+"validatemail/u", 
        data : JSON.stringify(data),
	beforeSend: (data) => {
	 this.setState({isLoadedSoft:false}); 
        },
	success : (response)=> {
	 const returnValue = response.data.reduce((a,b) => Object.assign(a,b), {});
	 store.set('user', { userid:returnValue.UserId, usermail:returnValue.Email });
	 this.setState({isLoadedSoft:true, displayFormm: 'inputCode'}); 
	
        },
	error : (err)=> {
	this.setState({isLoadedSoft:true, responseErrMail: 'Email does not exist on record',}); 
        }
});
  
  
}

}

resendValCode(){
	const userEmail = store.get('user').usermail;
	
	const data = {
		Email: userEmail
	}

	$.ajax({

		type : "POST",
		url:  process.env.API_URL+"validatemail/u", 
		data : JSON.stringify(data),
beforeSend: (data) => {
this.setState({isLoadedSend:false}); 
		},
success : (response)=> {
this.setState({isLoadedSend:true, displayFormm: 'inputCode',resentCode:true}); 

		},
error : (err)=> {
this.setState({isLoadedSend:true, responseErrCode: 'Incorrect code.',}); 
		}
});

}

handleVeriCodeSubmit(event) {

	event.preventDefault();
const {vericode,vericodeClean} = this.state;
this.handleCodeErr(vericode);
const userID = store.get('user').userid;

if ((vericodeClean == true) ){

  const data = {
	Vericode: vericode,
	UserId: userID
}
  
  $.ajax({

        type : "POST",
        url:  process.env.API_URL+"verifycode/u", 
        data : JSON.stringify(data),
	beforeSend: (data) => {
	 this.setState({isLoadedSoft:false}); 
        },
	success : (response)=> {
	 this.setState({isLoadedSoft:true, displayFormm: 'changePassword'}); 
	
        },
	error : (err)=> {
	this.setState({isLoadedSoft:true, responseErrCode: 'Incorrect code.'}); 
        }
});
  
  
}

}

handlePasswordChangeSubmit(event) {
event.preventDefault();
const {password,password2,passwordClean,password2Clean} = this.state;
this.handlPassErr(password);
this.handlPass2Err(password2);

const userID = store.get('user').userid;
if ((password2Clean && passwordClean == true) ){

  const data = {
	Password: password,
	UserId: userID
	
}
  
  $.ajax({

        type : "POST",
        url:  process.env.API_URL+"passchange/u", 
        data : JSON.stringify(data),
	beforeSend: (data) => {
	 this.setState({isLoadedSoft:false}); 
        },
	success : (response)=> {
	 this.setState({isLoadedSoft:true, displayFormm: 'successful'}); 
	
        },
	error : (err)=> {
	this.setState({isLoadedSoft:true, responseErrChangePass: 'Unable to Change Password. Try Again.',}); 
        }
});
	

  
}

}


componentDidMount(){
	this.setState({displayFormm: 'login'}); 
}



    render(){
const {responseErrChangePass,responseErrCode,responseErrMail,isLoadedSoft,isLoadedSend,resentCode,emailErr,passwordErr,responseErr,displayFormm,vericodeErr,password2Err} = this.state;
let userID ='';
store.has('user')==true ? 
userID = store.get('user').userid : null ;

    return(
	<>
{
	displayFormm === 'login'  ? 
	
	<div className="overlay">

  <div onClick={this.hideShare} className="modalForm" data-aos="fade-right" data-aos-duration="1000">
     
     <div onClick={this.props.hideForm} className="closeButtn"><span className="pe-7s-close-circle"></span></div>
     
     <div className="formCap">
       <div className="formCapleft">
         Log In
       </div>
       <div className="formCapright">
        Don't have an account? <span className="hotLink"><Link to="/register/">Sign up</Link></span>
       </div>
     </div>  
       
       <form id="regForm" onSubmit={this.handleSubmit}>
          
	    <div className="span" id="emailErr"> {emailErr}{responseErr} </div>	     
	     <div className="formFieldCont">
		
	      
	       <input 
                 type="email" 
                 name="email" 
                 placeholder="Email address"
		 onChange={this.handleEmailChange}
		 className="inputBox"
               />
	      </div>

	     <div className="span" id="passErr"> {passwordErr} </div>
	      <div className="formFieldCont">
		
	        <input
                 type="password" 
                 name="password" 
                 placeholder="Password"
		 onChange={this.handlePasswordChange}
		 className="inputBox"
               /> 
               </div>
	       
	       <div className="forgPass">
	         <div className="forgPassRight">
		   Forgot Password? <span className="hotLink" onClick={this.displayInputEmail}>Reset</span>
		 </div>
	       </div>
	     
	  {  
			isLoadedSoft ?
		    	<button className="loginSumitButt" type="submit"> LOG IN </button> :
					 <div className="loadLogin">
					  <img src={`${BASE_URL}utilities/images/softload.gif`}  />
					 </div>
		      
		}
		  
      </form>
      </div>
</div> : ''
}
{
	displayFormm === 'inputEmail'  ? 
<div className="overlay">

<div onClick={this.hideShare} className="modalForm" data-aos="fade-right" data-aos-duration="1000">
	 
	 <div onClick={this.props.hideForm} className="closeButtn"><span className="pe-7s-close-circle"></span></div>
	 
	 <div className="formCap">
		 <div className="formCapleft" style={{fontSize: '18px'}}>
			 Remember your Email Address? 
		 </div>
		 <div className="formCapright">
			</div>
	 </div>  
		 
		 <form id="regForm" onSubmit={this.handlePasChangeSubmit}>
				
		<div className="span" id="emailErr"> {emailErr}{responseErrMail} </div>	     
		 <div className="formFieldCont">
	       <input 
							 type="email" 
							 name="email" 
							 placeholder="Input Email address"
	 onChange={this.handleEmailChange}
	 className="inputBox"
				/>
			</div>

		 	 
			 <div className="forgPass">
				 <div className="forgPassRight">
				 Don't have an account? <span className="hotLink"><Link to="/register/">Sign up</Link></span>
		 	 </div>
			 </div>
		 
			 {  
			isLoadedSoft ?
			<button className="loginSumitButt" type="submit">SUBMIT </button> :
					 <div className="loadVerimail">
					  <img src={`${BASE_URL}utilities/images/softload.gif`}  />
					 </div>
		      
		  }
		
	

		</form>
		</div>
</div> : null
}

{
	displayFormm === 'inputCode'  ? 
<div className="overlay">

<div onClick={this.hideShare} className="modalForm" data-aos="fade-right" data-aos-duration="1000">
	 
	 <div onClick={this.props.hideForm} className="closeButtn"><span className="pe-7s-close-circle"></span></div>
	 
	 <div className="formCap">
		 <div className="formCapleft" style={{fontSize: '18px'}}>
			 Input Verification Code 
		 </div>
		 <div className="formCapright">
			</div>
	 </div> 

	 <div className="softStrip">
    A verification code has been sent to your mail. Input the code into the form field below.
	</div>

{
	resentCode && (
	<div className="softStrip2">
    The code has been resent to your mail. Please check spam folder as sometimes mails can be delivered there.
	</div> 
	)
}		 
		 <form id="regForm" onSubmit={this.handleVeriCodeSubmit}>
				
		<div className="span" id="emailErr"> {vericodeErr}{responseErrCode} </div>	     
		 <div className="formFieldCont">
	       <input 
							 type="text" 
							 name="vericode" 
							 placeholder="Input Code"
	 onChange={this.handleVeriCodeChange}
	 className="inputBox"
				/>
			</div>

		 	 
			 <div className="forgPass">
				 <div className="forgPassRight">
				 Didn't get the code? 
				 {  
			     isLoadedSend ?	 
				 <span onClick={this.resendValCode} className="hotLink"> Resend</span>:
				 <span className="hotLink"> Sending..</span>
				 }
		 	 </div>
			 </div> 
		 
		{  
			isLoadedSoft ?
			<button className="loginSumitButt" type="submit">VERIFY</button> :
					 <div className="loadVerimail">
					  <img src={`${BASE_URL}utilities/images/softload.gif`}  />
					 </div>
		      
		  }
	
	
		</form>
		</div>
</div> : null
}

{
	displayFormm === 'changePassword'  ? 
	
	<div className="overlay">

  <div onClick={this.hideShare} className="modalForm" data-aos="fade-right" data-aos-duration="1000">
     
     <div onClick={this.props.hideForm} className="closeButtn"><span className="pe-7s-close-circle"></span></div>
     
     <div className="formCap">
       <div className="formCapleft">
         Change Password
       </div>
       
     </div>  
       
       <form id="regForm" onSubmit={this.handlePasswordChangeSubmit}>
          
	    <div className="span" id="emailErr"> {passwordErr}{responseErrChangePass} </div>	     
	     <div className="formFieldCont">
		
	      
	       <input 
                 type="password" 
                 name="password" 
                 placeholder="Input New Password"
		 onChange={this.handlePasswordChange}
		 className="inputBox"
               />
	      </div>

	     <div className="span" id="passErr"> {password2Err} </div>
	      <div className="formFieldCont">
		
	        <input
                 type="password" 
                 name="password2" 
                 placeholder="Retype New Password"
		 onChange={this.handlePassword2Change}
		 className="inputBox"
               /> 
               </div>
	       
			{  
			isLoadedSoft ?
			    <button className="loginSumitButt" type="submit">CHANGE </button> :
					<div className="loadVerimail">
					  <img src={`${BASE_URL}utilities/images/softload.gif`}  />
					</div>
		      
		  }     
	     
	    
		
	
      </form>
      </div>
</div> : ''
}

{
	displayFormm === 'successful'  ? 
	
	<div className="overlay">

  <div onClick={this.hideShare} className="modalForm" data-aos="fade-right" data-aos-duration="1000">
     
     <div onClick={this.props.hideForm} className="closeButtn"><span className="pe-7s-close-circle"></span></div>
     
     <div className="successWrapper" data-aos="zoom-in" data-aos-duration="1000">

			<div className="successWrapperLeft">
				Successful
			</div>
			<div onClick={this.displayLoginForm} className="successWrapperRight">
				LOG IN
			</div>
			
			</div>  
       
       
      </div>
</div> : ''
}
</>
    );
    }
}


module.exports = withRouter (Loginform);