import React, {Fragment,useState,useEffect} from "react";
import {OnevideoProvider} from "../providers";
import { useHistory } from 'react-router-dom';
import store from 'storejs';
import {Helmet} from "react-helmet";
import Header from "../uiSources/header";
import Nav from '../uiSources/nav';
import Theater from './theater';
import EpisodePicker from "../uiSources/episosePicker";
import AOS from 'aos';
import '../../scss/product.scss';
import { Scrollbars } from 'react-custom-scrollbars';


AOS.init();
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;

 const Productpage = (props) => {
	let history = useHistory();
	//const client = useApolloClient();
	
	const [pathKey, setpathKey] = useState(history.location.key);


return(

	<OnevideoProvider match={props.match}>
 { ({ Input,item,videoRef,addQueueOnClick,pauseOnClick,playOnClick,displayTheater,handlehideTheater,toogleEpisodePicker,getOneVideo}) => (

<Fragment>
<Helmet>
<title>{`${item.itemTitle}`} - SJINET.COM</title>
</Helmet>

	<section className='Productview'>
	<div className="bgVidArt">
	{ item.trailerUrl &&
	     <video id={item.itemId} poster={item.itemImage} ref={videoRef} >
			   <source src={item.trailerUrl} alt="" />
            Your browser does not support HTML5 video.
        </video>
	}
	</div>
	
	<div className="gradCover">
	 <img src={`${BASE_URL}images/mask.png`} alt="" />
	</div>
	
	<div className="contenT" data-aos="fade-in" data-aos-duration="1000" data-aos-once>
	 
	 <section className="balancer">
            
 
	  <Header setpathKey={setpathKey} />

            
  </section>
	 
	<Nav />
	<Scrollbars autoHide style={{ height: '75%' }}>
	<section className='Productview__content'> 
	   <section className="balancer" style={{position:'relative'}}>
	       <div className="produtionTitle" >
	       {item.productionCompany} 
		  
	       </div>
	       
	       <section className="descripCont">
		  <h4 >{item.itemTitle} &bull; {item.productionYear}</h4>
{item.category=='TVSERIES' && <h5 >Season {item.season}, Episode {item.episode} <span onClick={toogleEpisodePicker} className="pe-7s-exapnd2"></span></h5> }
		  <div>
		  {`${item.description}`} 
		     
		  </div>
	{!item.timeLeft && (	  
		  <ul className="durationCont">
		     <li>Duration: {item.itemDuration}</li> 
		  </ul>
	)
	}	  
		  <ul className="setLibrary">
		  { Input.isAddedToQueue ?
				<li><span className="pe-7s-musiclist pe-va"></span> In Queue</li>  :
				<li onClick={addQueueOnClick}><span className="pe-7s-musiclist pe-va"></span> Add to Queue</li>
		    
		  }
		  
		  </ul>
		  
	{item.timeLeft && (
		<div>
		  <section className="liveInfoCont">
		     <div className="left">{item.itemDuration} </div>
		     <div className="right">{100 - item.timeLeft}% rem.</div>
		     
		  </section>
		 
		  <section className="progressBar">
		  <div className="progressBar__rec1">
        <div className="progressBar__rec2" style={{width: `${item.timeLeft}%`}}></div>
      </div>
		  </section>
		</div>
	)}
	    
	  <div>
		  <button onClick={()=>displayTheater()} className="watch-butnn">
		     WATCH NOW
		  </button>
		</div>
	  
	       </section>
	       { Input.showMediaButton==='play' ?
	       <div onClick={playOnClick} className="playTrail">Play Trailer</div> :
	       <div onClick={pauseOnClick} className="playTrail">Pause Trailer</div>
	       }
	    </section>
			</section>
			</Scrollbars>
	</div>
	</section>
{Input.episodePicker && (
<EpisodePicker getOneVideo={(value)=>getOneVideo(value)} variables={{title:item.itemTitle,season:item.season}} toogleEpisodePicker={toogleEpisodePicker} currentSeason={item.season}/>
)}
{ Input.showTheater && (
		<Theater refetch={Input.refetch} itemId={item.itemId} handlehideTheater={()=>handlehideTheater()} />
)

}
   

	</Fragment>
	)

}
</OnevideoProvider>
	
    )
    
}

export default Productpage;


