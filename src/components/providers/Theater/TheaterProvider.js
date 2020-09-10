import React, {useEffect,useState,useRef} from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ADD_HISTORY,GET_PRIOR_VIDEOS,ADD_LIKES,ADD_COMMENT, ADD_COMMENT_LIKES} from '../../Mutations/graphql';
import { GET_LIKES, GET_HISTORY } from "../../../apollo/queries";
import store from 'storejs';
import videojs from "video.js";
require('videojs-contrib-quality-levels');
require('videojs-http-source-selector');
require('!style-loader!css-loader!video.js/dist/video-js.css');
require('videojs-logo');
import {rounNumberToPresision,toggleQuality,deDupArray} from '../../utilities'

const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL;

const ThearterProvider = ({refetch,itemId,children}) => {

  const[likes, setLikes] = useState(0);
  const[video, setVideo] = useState({});
  const[queue, setQueue] = useState([]);
  const[supporting, setSupporting] = useState([]);
  const[comments, setComments] = useState([]);
  const [showDetails, setshowDetails] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const [showComment, setshowComment] = useState(false);
  const [showVideoRacks, setshowVideoRacks] = useState(true);
  const [showLikes, setshowLikes] = useState(false);
  const [showCommentLikes, setshowCommentLikes] = useState(false);
  const [responseErr,setResponseErr] = useState('');	
  const [comment,setComment] = useState('');
  const [commentErr,setCommentErr] = useState('');
  const [commentClean,setCommentClean] = useState('');
  const [isLoadedSoft,setIsLoadedSoft] = useState(true);
  const [nextmodal,setnextmodal] = useState(false);
  const [loader,setloader] = useState(false);

  const [getPriorVideos] = useMutation(GET_PRIOR_VIDEOS);
  const [addlikes] = useMutation(ADD_LIKES);
  const [addcomment] = useMutation(ADD_COMMENT);
  const [addcommentlikes] = useMutation(ADD_COMMENT_LIKES);
  const [addHistory] = useMutation(ADD_HISTORY);

  const [reload, setReload] = useState(false);
  const [player, setPlayer] = useState('');
  

  useEffect(() => {
    setloader(true);
    setReload(refetch);
    setTheater(itemId);
    
    return () => {
      if (player) videojs('my-player').dispose();
    }
    
       
  },[player]) 

  const setTheater= async (value) =>{
  
    const variables = {
      itemId: value
    }

    try{
    
      const { data, errors} = await getPriorVideos({
        variables,
        fetchPolicy:'no-cache', 
        errorPolicy:'all'
      });
      
      //if (errors) return setResponseErr(errors[0].message);
      
      const {video,likes,queue,supporting,comments} = data.getPriorVideo;
      setLikes(likes); 
      setVideo(video); 
      setQueue(queue); 
      setSupporting(supporting);
      setComments(comments);

      const props = {
        poster: video.itemImage,
        preload: 'auto',
        //liveui: false,
        //nativeControlForTouch: false,
        autoplay: true,
        controls: true,
        fill: true,
        sources: video.source,
        html5: {
          hls: {
            smoothQualityChange: true, //changes triggered via the representations API
            cacheEncryptionKeys: false
          }
        }
             
      }

      const player = videojs("my-player", props, function onPlayerReady() {
        player.addClass('vjs-sjimov');
        player.httpSourceSelector();

        player.on('loadedmetadata', async() =>{
        setloader(false);
        let qualityLevels = player.qualityLevels();
        await toggleQuality(qualityLevels.levels_);
        //console.log(qualityLevels);
        
        
        });
        
      
        let lastSec = null;
        const secondsToCallFunc = 10;
        player.on('timeupdate', () =>{
          const seconds = Math.floor(player.currentTime());
                    
          if(seconds % secondsToCallFunc == 0 && lastSec !== seconds){
              lastSec = seconds;
              const duration = rounNumberToPresision( player.duration(),0 );
              const currTime = rounNumberToPresision( player.currentTime(),0 );
              const timeRem = duration - currTime;
              const timeLeft = 100 - (timeRem * 100 / duration) || 5;
              
              const { data, errors} = addHistory({ 
                variables:{itemId:value,timeLeft:''+rounNumberToPresision(timeLeft,0)},
                errorPolicy:'all',
                update: (client, { data: {addHistory}}) => {
                  const data = client.readQuery({ query: GET_HISTORY });
                  const {history} = data;

                  const videoIndex = history.findIndex((video) => video.itemId === addHistory.video.itemId);
                  
                  if (videoIndex >=0) {
                   history[videoIndex].timeLeft = addHistory.video.timeLeft;
                   client.writeData({data:{history}});
                  }else{
                   const history = [...data.history, addHistory.video];
                   client.writeData({data:{history}});
                 }
                 
                } 
              });
              
          } 
        });
        
        player.on('ended', () =>{
          setnextmodal(true);
        });
      
      });

      setPlayer(player);
      return video;
  
    }catch(e){
      //setResponseErr('Bad Request. Try again later.');
      console.log(e.message);     
      //setIsLoadedSoft(true);
    }

  }
  
  
  

  const loadVideo = async(value) => {
    setnextmodal(false);
    setloader(true);
    const video = await setTheater(value);
    player.poster(video.itemImage);
    player.src(video.source);
    player.play(); 
    
    
  }

  const toogleLikes = async (e) => {
    setshowLikes(!showLikes);
    setLikes(showLikes ? likes - 1 : likes + 1);

    const variables = {
      itemId: video.itemId,
    }

    try{

      const { data, errors} = await addlikes({
        variables,
        errorPolicy:'all',
        update: (client, { data: {addLikes}}) => {
          const data = client.readQuery({ query: GET_LIKES });
          if ( addLikes.status === 'add' ) {
            const likes = [...data.likes, addLikes.video];
            client.writeData({data:{likes}});
          } else if (addLikes.status === 'delete') {
            const likes = data.likes.filter((video) => video.itemId !== addLikes.video.itemId)
            client.writeData({data:{likes}});
          }
          
        }
      });
      if (errors) console.log(errors[0].message);
        
    }catch(e){
      setResponseErr('Bad Request. Try again later.');
      console.log(e.message);     
      
    }
  }

  const toogleCommentLikes = async (itemId,commentId,authorId) => {

    setshowCommentLikes(!showCommentLikes);
    const commentIndex = comments.findIndex((comment) => comment.id === commentId);
    showCommentLikes ? comments[commentIndex].likes = -0 : comments[commentIndex].likes = +1;
    setComments(comments);
   
    const variables = {
      itemId: itemId,
      authorId: authorId,
      commentId: commentId 
    }

    try{

      const { data, errors} = await addcommentlikes({variables,errorPolicy:'all'});
      if (errors) console.log(errors[0].message);
        
    }catch(e){
      setResponseErr('Bad Request. Try again later.');
      console.log(e.message);     
      
    }
    
  }
  
  
  const toogleDetails = (e) => {
    setshowDetails(!showDetails);
    setshowComments(false);
    setshowComment(false);
    showVideoRacks ? setshowVideoRacks(false) : setshowVideoRacks(true);
  }

  const toogleComments = (e) => {
    setshowComments(!showComments);
    setshowDetails(false);
    setshowComment(false);
    showVideoRacks ? setshowVideoRacks(false) : setshowVideoRacks(true);
  }

  const toogleComment = (e) => {
    setshowComment(!showComment);
    setshowComments(!showComments);
  }

  const handleCommentErr = (value) => {
	
    if(value == ''){
			setCommentErr('Input a comment');
			setCommentClean(false);	
    }else{
			setCommentErr('');
			setCommentClean(true);
   }
  }

  const handleComment = (e) => {
    const {target} = event;
    const value = target.value;
    setComment(value);
    setResponseErr('');
    handleCommentErr(value);
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    handleCommentErr(comment);
    
    if ((commentClean== true) ){
    
      const variables = {
        itemId: video.itemId,
        comment
      }
    
      try{
        setIsLoadedSoft(false);
        const { data, errors} = await addcomment({variables,errorPolicy:'all'});
        setIsLoadedSoft(true);
    
        if (errors) return setResponseErr(errors[0].message);
        
        setshowComment(false);
        setshowComments(true);
        const {addComment} = data;
        const newComments = comments.filter((comment) => comment.user.viewerId != addComment.user.viewerId)
        setComments([addComment, ...newComments]);
      
      }catch(e){
        setResponseErr('Bad Request. Try again later.');
        console.log(e.message);     
        setIsLoadedSoft(true);
      }
    }
      
    }

    const toogleNextmodal = () => {
      setnextmodal(false);
    } 
  
  
  const Input = { 
    showDetails,
    showComments,
    showComment,
    showVideoRacks,
    showLikes,
    showCommentLikes,
    isLoadedSoft,
    nextmodal,
    loader,
   };
  
   
   const mergeArr = [...queue, ...supporting];
   const uniqueVideos = deDupArray(mergeArr, 'itemId');
   const supportingVideos = uniqueVideos.filter((vid) => vid.itemId != video.itemId)
  
  const data ={
    likes,
    video,
    queue,
    supporting: supportingVideos,
    comments,
  };
  

return (
    children({
      data,
      //videoJsOptions,
      Input,
      toogleDetails,
      toogleComments,
      toogleComment,
      toogleLikes,
      toogleCommentLikes: (itemId,commentId,authorId) => toogleCommentLikes(itemId,commentId,authorId),
      handleComment: (event) => handleComment(event),
      handleSubmit: (event) => handleSubmit(event),
      loadVideo: (value) => loadVideo(value),
      toogleNextmodal: ()=>toogleNextmodal(),
    })
);
    
};

export default ThearterProvider ;
