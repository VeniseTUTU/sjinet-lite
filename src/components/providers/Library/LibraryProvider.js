import React, {useEffect,useState} from "react";
import {withRouter,useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import {GET_USER, GET_HISTORY, GET_LIKES, GET_QUEUE} from '../../../apollo/queries';

const LibraryProvider = (props) => {
  
  const client = useApolloClient();
  const cacheHistoryData = client.readQuery({query:GET_HISTORY});
  const cacheQueueData = client.readQuery({query:GET_QUEUE});
  const cacheLikesData = client.readQuery({query:GET_LIKES});

let history = useHistory();
        
const [displayContent, setDisplayContent] = useState('history');
	    
const setLibraryTab = (value) => { 
    setDisplayContent(value); 
}

const directVideo = (value) => {
	history.push('/watch/'+value);
} 
 

const Input = {
  displayContent
  }

return (
    props.children({
      Input,
      cacheHistoryData,
      cacheQueueData,
      cacheLikesData,
      setLibraryTab: (value) => setLibraryTab(value),
      directVideo: (value) => directVideo(value),
    })
);
    
};

module.exports = withRouter (LibraryProvider);
