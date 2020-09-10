import React, {Fragment,useState} from "react";
import {withRouter, useHistory } from 'react-router-dom';
import store from 'storejs';
import Header from "../uiSources/header";
import {LibaryProvider} from '../providers';
import VideoBox from '../uiSources/videobox';
import {Helmet} from "react-helmet";
import AOS from 'aos';
import '../../scss/library.scss';
import { Scrollbars } from 'react-custom-scrollbars';
AOS.init();

const Librarypage = () => {

     return(
<LibaryProvider>
	{({Input,cacheHistoryData,cacheQueueData,cacheLikesData,setLibraryTab,directVideo}) => (

<Fragment>

<Helmet>
<title>Library - SJINET.COM</title>
</Helmet>

<section className="LBAlayout" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
   <section className="LBAlayout__balancer">
     <Header />
   </section>
	
	 
	<section className="LBAlayout__header">
	    <section className="LBAlayout__balancer">
	       <div>Library</div>
	      
	    <ul className="LBAlayout__tab">
		  <li onClick={()=>setLibraryTab('history')} className={Input.displayContent == 'history'? 'libselected' : null}>
	          History {/*<strong>{0}</strong>*/}
		  </li>
		  <li onClick={()=>setLibraryTab('playlist')} className={Input.displayContent == 'playlist'? 'libselected' : null}>
	          Queue {/*<strong>{0}</strong>*/}
	      </li> 
		  <li onClick={()=>setLibraryTab('favourites')} className={Input.displayContent == 'favourites'? 'libselected' : null}>
	        Liked {/*<strong>{0}</strong>*/}
	    </li>
		  
	    </ul>
	        
	    </section>
	</section>

	 
    <div className="LBAlayout__content">
	<section className="LBAlayout__balancer">
{ 
	 Input.displayContent == 'history' 
	 ? cacheHistoryData.history.length 
	   ? <VideoBox onClick={(value)=>directVideo(value)} contents={cacheHistoryData.history} videoClass={'library'} history={true}/>
		 : <div className="LBAlayout__resp"> No content found for this view. Your watch videos will show here.</div>
	 : null
} 
{ 
	Input.displayContent == 'playlist'
	? cacheQueueData.queue.length  
	  ? <VideoBox onClick={(value)=>directVideo(value)} contents={cacheQueueData.queue} videoClass={'library'} />
	  : <div className="LBAlayout__resp"> No content found for this view. Your watch videos will show here.</div>
	: null
}
{ 
	Input.displayContent == 'favourites'
	? cacheLikesData.likes.length 
	  ? <VideoBox onClick={(value)=>directVideo(value)} contents={cacheLikesData.likes} videoClass={'library'} />
		: <div className="LBAlayout__resp"> No content found for this view. Your watch videos will show here.</div>
		: null
}
   </section>
   
      </div>
	
	</section>
	</Fragment>
	)}
</LibaryProvider>


    );
    
}

export default Librarypage;


