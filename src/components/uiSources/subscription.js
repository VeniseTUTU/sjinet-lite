import React, {Fragment, useState} from "react";
import AOS from 'aos';
import {rounNumberToPresision} from '../utilities/'; 
AOS.init();

const Subscription = ({Input,subscription,lauchCheckout,cancelSubscription}) => {

   const [morebillinginfo, setmorebillinginfo] =  useState(false);
	const [moresubinfo, setmoresubinfo] =  useState(false);
	
	const toggleBilllingInfo = () =>{
		setmorebillinginfo(!morebillinginfo);
	}
	const toggleSubExtInfo = () =>{
		setmoresubinfo(!moresubinfo);
   }
   
   const formatDate_Word = (datee) =>{
   const dateArr = ['January','Febrary','March','April','May','June','July','August','September','October','November','December'];
   const date = new Date(+datee);
   return date.getDate() +' '+ dateArr[(date.getMonth())] +', '+ date.getFullYear();
   
   }
const getSubStatus = (status) => {
   let holdStatus;
   switch(status){
      case "active":
      holdStatus ='Active'
      break;
      case "cancelled":
      holdStatus ='Cancelled'
      break;
      case "expired":
      holdStatus ='Expired'
      break;

      default:
      break;
   }
  return holdStatus
}
  
   
 
                
return(
<Fragment>
<div className="Billingview" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
   <div>
      
{ subscription.status.toLowerCase() == 'expired' && (
   <div className="Billingview__Subnotice">
   {process.env.FREE_TRIAL_AMOUNT == subscription.amount 
   ? <span><strong>Free trial has expired.</strong> Please Subscribe at ${process.env.BILLING_AMOUNT}/mo</span>
   : <span><strong>Subscription has expired.</strong> Please Subscribe.</span>
   }
   </div>
)}

{ subscription.status.toLowerCase() == 'cancelled' && (
   <div className="Billingview__Subnotice">
   <span><strong>Subscription has been Cancelled.</strong> You can still access this subscription up till {formatDate_Word(subscription.dueDate)}</span>
   </div>
)}
      <div className="Billingview__title">
       {process.env.FREE_TRIAL_AMOUNT == subscription.amount 
           ? `30-day Free Trial`
           : subscription.recurring=='true'
             ? `Recurring ${subscription.subscriptionPlan}`
             : `One-time ${subscription.subscriptionPlan}`
      }
      </div>
   {getSubStatus(subscription.status.toLowerCase())=='Active'
    ? <div className="Billingview__activestatus">{getSubStatus(subscription.status.toLowerCase())}  </div>
    : <div className="Billingview__expiredtatus">{getSubStatus(subscription.status.toLowerCase())} </div>
   }
     
    
   <div className="Billingview__subId">Subscription ID: {subscription.subscriptionId}</div>
   </div>
   <div className="Billingview__details">
      <table>
      <tbody>
   <tr>
      <td className="td1">Amount:</td>
      <td className="td2">
      ${process.env.FREE_TRIAL_AMOUNT == rounNumberToPresision(+subscription.amount,1)
         ? rounNumberToPresision(+subscription.amount,1)
         : process.env.BILLING_AMOUNT
      } for {subscription.quantity} Month</td>
   </tr>
   </tbody>
      </table>
   </div>
   <div className="Billingview__details">
      <table>
         <tbody>
   <tr>
      <td className="td3">Subscription Life:</td>
      <td className="td2">{formatDate_Word(subscription.startDate)} <strong>To</strong> {formatDate_Word(subscription.dueDate)}</td>
   </tr>
   </tbody>
      </table>
   </div>
   <div className="Billingview__more">

   { subscription.status.toLowerCase() == 'expired' && (
      process.env.FREE_TRIAL_AMOUNT == subscription.amount 
      ? <button onClick={()=>lauchCheckout()}><span className="">Subscribe</span></button>
      : <button onClick={()=>lauchCheckout()}><span className="">Subscribe</span></button>
   )}

   <div onClick={toggleBilllingInfo}  className="Billingview__showBillInfo">More<span className="pe-7s-angle-down pe-va Billingview__middIcon"></span></div>
   
   </div>

{ morebillinginfo && (
   <section className="Billingview__info">
   <div onClick={toggleSubExtInfo} className="Billingview__morePanel filterTitl">
      <span className="pe-7s-plus pe-va middIcon3"></span>Subscription Details 
   </div>
{ moresubinfo && (
   <section className="Billingview__subscExtDetail">
      
      <table>
         <tbody>
         <tr>
          <td> Subscription Type:</td>
          <td style={{paddingLeft:'10px'}}>
{process.env.FREE_TRIAL_AMOUNT == subscription.amount 
           ? `30-day Free Trial`
           : subscription.recurring=='true'
             ? `${subscription.subscriptionPlan} (Recurring)`
             : `${subscription.subscriptionPlan} (One-time)`
}
          </td> 
         </tr>
         <tr>
          <td> Subscription Start:</td>
          <td style={{paddingLeft:'10px'}}>{formatDate_Word(subscription.startDate)} </td> 
         </tr>

         <tr>
          <td> Subscription Due:</td>
          <td style={{paddingLeft:'10px'}}>{formatDate_Word(subscription.dueDate)} </td> 
         </tr>

         <tr>
          <td> Subscription ID:</td>
          <td style={{paddingLeft:'10px'}}>{subscription.subscriptionId} </td> 
         </tr>

         <tr>
          <td> Transaction Date:</td>
          <td style={{paddingLeft:'10px'}}> {formatDate_Word(subscription.createdAt)} </td> 
         </tr>

         <tr>
          <td> Payment Gateway:</td>
          <td style={{paddingLeft:'10px'}}> {subscription.gateway} </td> 
         </tr>

         <tr>
          <td> Subscriber Email:</td>
          <td style={{paddingLeft:'10px'}}>{subscription.subscriberEmail} </td> 
         </tr>

         <tr>
          <td> Subscriber FirstName:</td>
          <td style={{paddingLeft:'10px'}}> {subscription.subscriberFirstName} </td> 
         </tr>

         <tr>
          <td> Subscriber LastName:</td>
          <td style={{paddingLeft:'10px'}}> {subscription.subscriberLastName} </td> 
         </tr>

        </tbody>
      </table>
      
   </section>
)
}	 
{( subscription.recurring =='true' && subscription.status.toLowerCase() == 'active') && (
   <>
<div className="Billingview__cancelCon">
      If you want to cancel this subscription, click here:
      {Input.isLoadedSoft
      ? <span className="Billingview__hyperLink"> Cancelling...</span>
      :<span onClick={()=>cancelSubscription(subscription.subscriptionId)} className="Billingview__hyperLink"> Cancel</span>
      
      } 

   </div>
   <div className="Billingview__cancelCaveat">
      Note: If you cancel your subscription, you can still access it up till {formatDate_Word(subscription.dueDate)}
   </div>
   </>
)
} 
   
   </section>
)
}
   </div>
</Fragment>
);

}
   export default Subscription;
