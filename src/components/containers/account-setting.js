import React, {Fragment, useState} from "react";
import store from 'storejs';
import {Helmet} from "react-helmet";
import Header from "../uiSources/header";
import {Toast} from "../uiSources/toast";
import AOS from 'aos';
import {UpdateProvider} from '../providers/';
import '../../scss/account-setting.scss';
import '../../scss/library.scss';

const Usersettingpage = () =>{

	
return(

<Fragment>

<Helmet>
   <title>Account Setting - SJINET.COM</title>
</Helmet>

<UpdateProvider>

	{({input,cacheUserData,handleChange,handleDetailsSubmit,handlePassSubmit}) => (

<section className="LBAlayout" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
	<section className="LBAlayout__balancer">
	<Header />
   </section>
	
	<section className="LBAlayout__header acctheader">
	    <section className="LBAlayout__balancer">
	       <div>Account Settings</div>
	    </section>
	{ input.displaytoast && (
		 <Toast {...input.toast} />
	)}
	</section>

	<section className="LBAlayout__content">
	    <section className="LBAlayout__balancer">
	       <div className="billingCont2">
		       <div className="formWrapper">

		  <section className="formTitle">Edit Profile</section>

<form onSubmit={handleDetailsSubmit} > 
			<div className="bnm">
			<label htmlFor="firstname">First Name {input.firstnameErr}
				<input 
					type="text" 
					id="firstname" 
					name="firstname" 
					defaultValue={cacheUserData.user.viewer.firstName}
					onChange={(e) => handleChange(e)} 
				 />
			</label>
			</div>

			<div className="bnm">
			<label htmlFor="lastname">Last Name {input.lastnameErr}
				<input 
					type="text" 
					id="lastname" 
					name="lastname" 
					defaultValue={cacheUserData.user.viewer.lastName}
					onChange={(e) => handleChange(e)} 
				/>
			</label>
			</div>
		   
			<div className="bnm">
			<label htmlFor="phone">Phone {input.phoneErr}
				<input 
					type="phone" 
					id="phone" 
					name="phone" 
					defaultValue={cacheUserData.user.viewer.phone}
					onChange={(e) => handleChange(e)} 
				/>
			</label>
			</div>
			
			<div className="bnm">
			<label htmlFor="birthdate">Date of Birth
				<input 
					type="text" 
					id="birthdate" 
					name="birthdate" 
					value="" 
					placeholder="mm/dd/yyyy"
					disabled 
				/>
			</label>
			</div>
	{input.detLoading
	? <button className="sending-button">Sending...</button>
	: <button  type={`submit`}>Save Changes</button>
   }		
			
			
</form>
		  </div>
	   </div>
 </section>
	    
	    <section className="LBAlayout__balancer">
	       <div className="changeEmailCont">
		     <div className="changeEmailWrapper">
		     <div className="formTitle">Change Email</div>
		     <div className="div1">
					You can change your email at any time, but you
					have to confirm the email after the change.
		     </div>
		     <div className="div2">slypalmer15@gmail.com <span className="hyperLink">Change</span></div>
		  </div>
	       </div>
	       
	    <div className="changePasswordCont">
		  <div className="changePasswordWrapper">
		     <section className="formTitle">Change Password</section>

	<form onSubmit={handlePassSubmit} >	     
			  <div className="bnm">
			   <label htmlFor="newpassword">Old Password {input.passwordErr}
					<input 
						type="password" 
						id="password" 
						name="password"
						onChange={(e) => handleChange(e)}   
					/>
			   </label>
			   </div>
			   
				<div className="bnm">
			   <label htmlFor="confirmpassword">New Password {input.newpasswordErr}
					<input 
						type="password" 
						id="newpassword" 
						name="newpassword"
						onChange={(e) => handleChange(e)}   
					/>
			   </label>
			   </div>
			
			{input.passLoading
				? <button className="sending-button">Sending...</button>
				: <button  type={`submit`}>Save Changes</button>
			}
	</form>		
		  </div>
	 </div>
	       <div className="delAccountCont">
		     <div className="delAccountWrapper">
		     <div className="formTitle">Delete Account</div>
		     <div className="div1">
					You can change your email at any time, but you
					have to confirm the email after the change.
		     </div>
		     
			   <button>Delete Account</button>
			
		  </div>
	   </div>
	       
	   </section>
	</section>
	
</section>
	)}
	</UpdateProvider>
	
</Fragment>	
    );
    }
      

export default Usersettingpage;

