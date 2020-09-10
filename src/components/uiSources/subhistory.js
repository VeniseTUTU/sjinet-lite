import React, {Fragment, useState} from "react";
import AOS from 'aos';
AOS.init();

const SubscriptionHistory = ({subscriptions}) => {

const formatDate = (date) => {
   const newdate = new Date(+date);
	return newdate.getDate() +'/'+ (newdate.getMonth()+2) +'/'+ newdate.getFullYear();
     
}
             
return(
<Fragment>
<div className="Billingview" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
   <div>
      <div></div>
      <div className="Billingview__title">Transaction History</div>
   </div>
   <ul className="Billingview__transactions">
    {
       subscriptions.map((sub,index) => (
      <li key={index}>
         <div className="Billingview__transactions__type">{sub.subscriptionPlan} &bull; <span>{sub.subscriptionId}</span></div>
         <div className="Billingview__transactions__details">
           <div>Gateway: {sub.gateway}</div>
           <div style={{textAlign:'center'}}>Date: {formatDate(sub.createdAt)}</div>
           <div style={{textAlign:'right'}}>Status: {sub.status}</div>
         </div>
      </li>
       ))
    }
      

      
   </ul>
</div>
</Fragment>
);

}
   export default SubscriptionHistory;
