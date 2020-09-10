import React, {useEffect,useState} from "react";
import {useHistory } from 'react-router-dom';
import { useQuery,useApolloClient } from '@apollo/react-hooks';
import {GET_VIEWER_CONTENT} from '../../Mutations/graphql';
import {GET_HISTORY} from '../../../apollo/queries';



const MoviesProvider = ({ children }) => {

  const client = useApolloClient();
  const history = useHistory();
  const cacheHistoryData = client.readQuery({query:GET_HISTORY});

  const[histories, setHistories] = useState([]);
  const[videos, setVideos] = useState([]);
  const[suggestions, setSuggestions] = useState([]);

  useQuery(GET_VIEWER_CONTENT, {
    variables:{
      category:'MOVIES',
    },
    onCompleted: (data) => {
       const {histories,videos,suggestions} = data.getViewerContent;
       setHistories(histories); 
       setVideos(videos); 
       setSuggestions(suggestions);  
    }
   
  });

  const directVideo = (value) => {
    const searchParam = '/watch/'+value; 
    history.push(searchParam);
    
  } 

  const Input = {
    
  }
 
    return (
      children({
        histories,
        videos,
        suggestions,
        cacheHistoryData,
        directVideo: (value)=>directVideo(value),
      })
    )
  

     
  };

export default MoviesProvider;

