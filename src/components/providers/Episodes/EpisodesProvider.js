import React, {useEffect,useState} from "react";
import {useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {GET_EPISODES,ONE_VIDEO} from '../../Mutations/graphql';



const EpisodesProvider = ({ children,variables,toogleEpisodePicker,getOneVideo }) => {
  let history = useHistory();
  const [GetEpisodes] = useMutation(GET_EPISODES);
  const [GetOneVideo] = useMutation(ONE_VIDEO);
  const [isLoadedSoft,setIsLoadedSoft] = useState(false);
  const[episodes, setEpisodes] = useState([]);

  useEffect(()=>{
    getEpisodes(variables);
  },[])
  
const getEpisodes = async (variables) => {
  
  try{
    setIsLoadedSoft(true);
    const { data, errors} = await GetEpisodes({variables,errorPolicy:'all'});
    setIsLoadedSoft(false);

    if (errors) return console.log(errors[0].message);
   
    const {getEpisodes:Episodes} = data;
    setEpisodes(Episodes);

  }catch(e){
    console.log(e.message);     
    setIsLoadedSoft(false);
  }
  return null;

}

  const handleSeasonChange = () => {
    const {target:{value}} = event;
    console.log(value);
    getEpisodes({...variables, season:value});
  }

  const handleSelectEpisode = (value) => {
    console.log(value);
    getOneVideo({itemId:value});
    //history.push('/watch/'+value);
    //history.location.pathname.split('/');
    toogleEpisodePicker();
  }
  

  const Input = {
    isLoadedSoft
  }
 
    return (
      children({
        Input,
        episodes,
        handleSelectEpisode: (value) => handleSelectEpisode(value),
        handleSeasonChange: handleSeasonChange,
      })
    )
  
  };

export default EpisodesProvider;

