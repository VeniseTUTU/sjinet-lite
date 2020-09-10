import React, {useEffect,useState,useRef} from "react";
import store from 'storejs';
import {withRouter,useHistory } from 'react-router-dom';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import {ONE_VIDEO,ADD_QUEUE} from '../../Mutations/graphql';
import {GET_USER} from '../../../apollo/queries';


const HeaderProvider = ({match,children}) => {

  const history = useHistory();
  const client = useApolloClient();
  const cacheUserData = client.readQuery({query:GET_USER});

  const [avatar, setAvatar] = useState('true');
  const [isHidden, setIsHidden] = useState(true);
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayICons, setDisplayICons] = useState(true);
  const [displaySuggestion, setDisplaySuggestion] = useState(true);

  const Input = {
    avatar,
    isHidden,
    results,
    data,
    showMenu,
    displayICons,
    displaySuggestion,
    displaySearch
  }

const showMenuIcons = () => {
  setDisplayICons(true);
};

const hideMenuIcons = () => {
  setDisplayICons( true );
  setResults( [] );
};

const toggleSearch = () => {
  setDisplaySearch( !displaySearch );
  
}

const toggleShowMenu = () => {
  setShowMenu(true);
};

const toggleHideMenu = () => {
  if (showMenu)  setShowMenu(false)
}
      
const handleEscapeOutside = () => {
  setShowMenu(false);
  setDisplaySuggestion(false);
}

const handlelogout = () => {

  client.clearStore().then(()=>{
    store.remove('user');
    history.push('/login');
  });

}

return (
    children({
      Input,
      cacheUserData,
      showMenuIcons,
      hideMenuIcons,
      toggleSearch,
      toggleShowMenu,
      handlelogout,
      handleEscapeOutside,
      toggleHideMenu,
      
      //playOnClick: (e) => playOnClick(e),
      
    })
);
    
};

module.exports = withRouter (HeaderProvider);
