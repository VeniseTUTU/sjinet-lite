import React, {Suspense,useEffect,useState} from "react";
import {TvseriesProvider} from '../providers';
import {GrowingSquare} from "../loaders";
import '../../scss/movies.scss';
import {Helmet} from "react-helmet";
import AOS from 'aos';
import Header from "../uiSources/header";
import {filterWord} from "../utilities";
const VideoRack = React.lazy(() => import ("../uiSources/videorack"));
import Nav from "../uiSources/nav";

AOS.init();


const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;

const TvSeries = (props) => {


    useEffect(() => {
      window.scrollTo(0,0)
    },[]);
        
return(
   

<React.Fragment>

<Helmet>
<title>Tv Series - SJINET.COM</title>  
</Helmet>

<TvseriesProvider>
  {({histories,videos,suggestions,cacheHistoryData,directVideo}) => (
    <section className="Movieview">
       <section className="Movieview__header">
        <section className="Movieview__balancer">
            
          <Header />
            
         </section>
	 
	       <Nav />
        </section>
 
	<section className="Movieview__content ">
   <section className="Movieview__balancer">
   
   <Suspense fallback={<GrowingSquare />}>
          
   {cacheHistoryData.history.length>0 && (
   <VideoRack key={1} onClick={(value)=>directVideo(value)} videoClass="movieCell" className="subCategoryTitle" contents={cacheHistoryData.history} title="Recently Watched" history={true} /> 
   )} 
   <VideoRack key={2} onClick={(value)=>directVideo(value)} videoClass="movieCell" className="subCategoryTitle" contents={filterWord(videos,'trending')} title="Trending" />
   <VideoRack key={3} onClick={(value)=>directVideo(value)} videoClass="movieCell" className="subCategoryTitle" contents={suggestions} title="Suggested Videos" />     
          
   </Suspense>
 	</section>
   </section>
   
 </section>
  )}
</TvseriesProvider>
    
</React.Fragment>
    );
    

}

export default TvSeries;



