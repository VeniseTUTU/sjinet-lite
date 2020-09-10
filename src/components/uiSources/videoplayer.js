import React, {useRef,useEffect,Component} from "react";
import videojs from "video.js";
require('!style-loader!css-loader!video.js/dist/video-js.css');
import { NavLink, Link, withRouter } from 'react-router-dom';


const VideoPlayer = (props) => {
    
	const videoRef = useRef();
	const videoNode = videoRef.current;

	const addVideoToUserHistory = () => {

	const apidata={
	userId : props.userId,
	//temId : this.props.itemId
	
};
return apidata;
}

useEffect(() => {

	const player = videojs("my-player", props, function onPlayerReady() {

		player.addClass('vjs-sjimov');
		player.on('ended', () =>{
			
		}) //halt 'ended' event
		//const playlists = result.data;
		//player.playlist(playlists,0);
		/*
		player.playlistUi({
			className: 'sjPlaylists',
			playOnSelect:true,
			horizontal:true,
			playlistPicker: true,
			nextOverlay: true,
			autoadvance: 1,
			nextEndScreen: true,
			nextButton: true,
			repeat:true,
		});
		*/
	
	})

	// destroy player on unmount
	return () => {
	  if (player) player.dispose();
	}
  
  }, []); 

const apidata = addVideoToUserHistory();

return(
	<div className="videoCont">
    <video-js id="my-player" className="vjs-sjimov" ref={ videoRef }></video-js>
    </div>
	    
    );

}

export default VideoPlayer;


