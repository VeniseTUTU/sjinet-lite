import React, {Suspense, useState, useEffect} from "react";
import {TheaterProvider,TransitionProvider} from "../providers";
const VideoRack = React.lazy(() => import ("../uiSources/videorack"));
import '../../scss/theater.scss';
import { CommentIcon,InfoIcon,LikeIcon, ShareIcon } from '../Icons';
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
         : process.env.USE_BASE_URL;
import {GrowingSquare,TheaterSpinner} from "../loaders";
import {Avatar} from "../Icons";
import {getDaysBetween} from "../utilities";
import AOS from 'aos';
AOS.init();


 const Theater = ({refetch,itemId,handlehideTheater}) =>{

  
    return(
<TheaterProvider itemId={itemId} refetch={refetch}> 
 {
    ({ data:{video,queue,supporting,likes,comments}, 
      videoJsOptions,
      Input, 
      showVideoRacks, 
      toogleDetails,
      toogleComments, 
      toogleComment, 
      toogleLikes, 
      handleComment, 
      handleSubmit, 
      toogleCommentLikes, 
      loadVideo,
      toogleNextmodal 
    }) => (
 
 <section className="TheaterWrapper" data-aos="zoom-in-up"  data-aos-once>
   <section className="TheaterWrapper__topRow">
    <section className="TheaterWrapper__titleBar">
      <section className="thtWedge">

        <ul className="TheaterWrapper__leftContent">
            <li onClick={()=>handlehideTheater()} ><span className="gg pe-7s-angle-left"></span></li>
            <li>{video.itemTitle} <br/><span>{video.productionYear}</span></li>
        </ul>

        <ul className="TheaterWrapper__rightContent">
            <li>Queue ({queue.length})</li>
            
        </ul>
       </section>
   </section> 

   <section className="thtbodWrapper">
        <section className="thtWedge">

    <div className="videoCont">
{ Input.loader && (
    <TheaterSpinner />
)}
  {Input.nextmodal && (
    <div className="TheaterWrapper__nextOverlay" data-aos="fade-left" data-aos-duration="1000">
    <section className="TheaterWrapper__nextOverlay__bracer">
      <section className="TheaterWrapper__nextOverlay__top">
        <div  className="TheaterWrapper__nextOverlay__top__left">
         <img src={supporting.length && supporting[0].itemImage} />
        </div>
        <div className="TheaterWrapper__nextOverlay__top__right">
          <div className="TheaterWrapper__nextOverlay__top__right__title">
          {supporting.length && supporting[0].itemTitle}
          </div>
          <div className="TheaterWrapper__nextOverlay__top__right__bod">
          {supporting.length && supporting[0].productionCompany} - {supporting.length && supporting[0].productionYear}
          </div>
        </div>
      </section>
      <section className="TheaterWrapper__nextOverlay__bottom">
        <div onClick={()=>loadVideo(supporting.length && supporting[0].itemId)}className="TheaterWrapper__nextOverlay__bottom__play">PLAY</div>
        <div onClick={()=>toogleNextmodal()} className="TheaterWrapper__nextOverlay__bottom__cancel">CANCEL</div>
      </section>
      
      </section>
    </div>

  )}
    <Suspense fallback={<GrowingSquare />}>
    <video-js id="my-player" className="vjs-sjimov" ></video-js>
    </Suspense>
    </div>
                    
            <section className="materailCont">
                <div className="materialLeft">
                    <ul className="vidTitleCont">
                        <li className="vidTitleCont__left">{video.productionCompany}</li>
                        <li className="vidTitleCont__right"><span> </span></li>
                    </ul>
                    <section className="vidWrapp">
                    <ul className="vidEngage">
                        
                      <li id='info' onClick={toogleDetails}>
                       <InfoIcon fill={'theaterIcon'} />
                      </li>

                      <li id='comment' onClick={toogleComments}>
                       <CommentIcon fill={'theaterIcon'} />
                      </li>

                      <li id='like' onClick={toogleLikes}>
                       <LikeIcon fill={Input.showLikes ? `theaterHotIcon` : `theaterIcon`} />
                      </li>

                      <li id='share' style={{marginRight:'0px',paddingRight:'0px'}}>
                       <ShareIcon fill={'theaterIcon'} />
                      </li>
                      </ul>
                        
                      <ul className="vidStats">  
                        
                        <li> {comments.length} Comments  &bull; {likes} Likes </li>
                        
                      </ul>
                     </section>   
                    
                </div>
                
            </section>
            
        </section>
    </section>

    </section>

    <section className="TheaterWrapper__bottomRow">
    <section className="subthtbodWrapper">

    <section className="thtWedge">
            
     { Input.showDetails && (
         <TransitionProvider id={1} className="details">
            <>
            <div className="detailsContent">
            <div className="detailsContent__title">Details</div>
            <div className="detailsContent__close"><span onClick={toogleDetails} className="pe-7s-close"></span></div>
            </div> 
            <div className="detailsContent__body">{video.description}</div>
            </>
         
        </TransitionProvider>
      )}

    { Input.showComments && ( 
        <TransitionProvider id={1} className="details">
        <>
        <div className="detailsContent">
        <div className="detailsContent__title">Comments</div>
        <div className="detailsContent__close"><span onClick={toogleComments} className="pe-7s-close"></span></div>
        </div>

        <ul className="userComment"> 
            <li className="userComment__avatar"></li>
            <li onClick={toogleComment} className="userComment__box">Drop your thoughts here</li>
        </ul>

        <ul className="publicComment">
        { comments.map((comment,index) => (

          <li key={index}>
          <div className="publicComment__avatar">
          { comment.user.imageUrl 
             ? <img src={comment.user.imageUrl} alt={`sjinet-`} />
             : <Avatar />

          }
            
          </div>
          <div className="publicComment__box">
            <div className="publicComment__box__nameDate">
                {comment.user.firstName+' '+comment.user.lastName} - <span>{getDaysBetween(comment.createdAt,new Date())}</span>
            </div>
            <div className="publicComment__box__body">
                {comment.comment}
            </div>
            <div className="publicComment__box__reactions">
              
                <div onClick={() => toogleCommentLikes(video.itemId,comment.id,comment.user.viewerId)} className="publicComment__box__reactions__likeIcon">
                  <LikeIcon fill={Input.showCommentLikes ? `theaterHotIcon` : `theaterIcon`} />
                </div> 
                <div className="publicComment__box__reactions__likeText">&bull; {comment.likes} likes</div>
              
            </div>
          </div>
          </li>
          
        ))
            
        }
            
        </ul>
        </>
            
        </TransitionProvider>
      )}

{ Input.showComment && ( 
    <TransitionProvider id={1} className="details">
    <>
      <div className="detailsContent">
        <div className="detailsContent__title"> </div>
        <div className="detailsContent__close"><span onClick={toogleComment} className="pe-7s-close"></span></div>
      </div>
      <form onSubmit={handleSubmit}>
        <section className="Comment">
        <div className="Comment__input">
        <textarea 
          onChange={handleComment}
          name="comment" 
          placeholder="Drop your thoughts here..">
        </textarea>

        </div>

        { Input.isLoadedSoft ?
		    	<button className="Comment__button" type="submit"> Comment </button> :
					 <div className="loadComment">
					  <img src={`${BASE_URL}utilities/images/softload.gif`}  />
					 </div>
		      
	    	}
        </section>
     </form>
      </>
            
        </TransitionProvider>
      )}
            
{ Input.showVideoRacks && (  
     <VideoRack key={2} onClick={(value)=>loadVideo(value)} videoClass="theaterCell" className="TheaterTitle" contents={supporting} title="UP NEXT" />
)}  

  </section>
    </section>
    </section>

</section>

)
}     
</TheaterProvider>
  
    );
    

}

export default Theater;


