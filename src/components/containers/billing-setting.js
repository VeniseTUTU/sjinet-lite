import React, {Fragment,useState} from "react";
import {withRouter, useHistory } from 'react-router-dom';
import store from 'storejs';
import {Helmet} from "react-helmet";
import Header from "../uiSources/header";
import Subscription from "../uiSources/subscription";
import SubscriptionHistory from "../uiSources/subhistory";
import {BillingProvider} from '../providers/';
import {RoundedToast} from '../uiSources/toast';
import AOS from 'aos';
import '../../scss/library.scss';
import '../../scss/billing-setting.scss';
AOS.init();

const Billingpage = () => {

	const [displayContent, sestdisplayContent] = useState('subscription');
	
	const setBillingTab = (value) => {
		sestdisplayContent(value);
	}

return(

<Fragment>

<Helmet>
<title>Billing - SJINET.COM</title>
</Helmet>
<BillingProvider>  
	{({Input, cacheTransactionData, activeSubscription, lauchCheckout, lauchCheckoutRecuring, cancelSubscription}) => (

		<section className="LBAlayout" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
	
{Input.displaytoast && (
	<RoundedToast {...Input.toast}/>
)}

      <section className="LBAlayout__balancer">  
         <Header/>
      </section>

		<section className="LBAlayout__header">
		  <section className="LBAlayout__balancer">
	       <div>Billing</div>
	       <ul className="LBAlayout__tab">
			 <li onClick={()=>setBillingTab('subscription')} className={displayContent == 'subscription'? 'libselected' : null}>
	          Subscription 
		    </li>
			 <li onClick={()=>setBillingTab('history')} className={displayContent == 'history'? 'libselected' : null}>
	          History 
		    </li>
		    </ul>
	        
	    </section>
	   </section>
	 
      <div className="LBAlayout__content">

	   <section className="LBAlayout__balancer">
	{ 
	displayContent == 'subscription' 
	? activeSubscription
		? <Subscription
		    Input={Input} 
				subscription={activeSubscription} 
				cancelSubscription={(value)=>cancelSubscription(value)} 
				lauchCheckout={()=>lauchCheckoutRecuring()}/>
		: <div className="LBAlayout__resp"> You have no active subscription. Start a trial. <br/>
		 <button onClick={()=>lauchCheckout()}>Add Your Billing Info</button>
		</div>
	: null

	}    
	{ 
	displayContent == 'history' 
	? cacheTransactionData.transaction.length
		? <SubscriptionHistory subscriptions={cacheTransactionData.transaction} />
		: <div className="LBAlayout__resp"> You have no transaction history </div>
	: null
	}     
			 
         
	   </section>
	
	 
     </div>
     
	</section>

	)}
</BillingProvider>
	
	</Fragment>
    );
    
}      

export default Billingpage;

