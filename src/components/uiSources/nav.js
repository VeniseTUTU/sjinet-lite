import React, {Fragment, useState} from "react";
import { NavLink, Link, useHistory } from 'react-router-dom';
import {stripWhiteSpaceAndLowCap} from "../utilities";
import '../../scss/nav.scss';
import ScrollContainer from 'react-indiana-drag-scroll';
import Search from "../uiSources/search";
import { useApolloClient } from '@apollo/react-hooks';
//import {ONE_VIDEO} from '../Mutations/graphql';

const Nav = () => {

    const [displayNavSearch, setDisplayNavSearch] =  useState(false);
    const client = useApolloClient();
    const history = useHistory();
   
const tabs = [
    "Movies", 
    "TV Series",
    "SJ Originals",
    "Action",
    "Comedy",
    "Documentatry",
    "Horror",
    "War",
    "Science Fiction"
];

const toggleSearch = () => {
 setDisplayNavSearch( !displayNavSearch );
}

const handleTab = (value) => {
    const filterVal = value.toLowerCase();
   
    if(filterVal ==='movies'){
        history.push('/movies');
    }else if (filterVal ==='tv series'){
        history.push('/tvseries');
    }else{
        client.writeData({data:{ videoFilter: filterVal} }); 
        setDisplayNavSearch( true );
    }
   
}

                 
        return(
        <Fragment>
{
  displayNavSearch && <Search toggleSearch={()=>toggleSearch()} />
}
    
        
        
        
            <nav className="CategoryTab">
            <section className="CategoryTab__balancer">
            
                <ul>
                <ScrollContainer className="scroll-container" >

                {
                    tabs.map((tab,index) => (
                    <li key={index} onClick={()=> handleTab(tab)}>
                        {tab}
                    </li>
                    ))
                }
                </ScrollContainer>
		</ul>
        </section>
            </nav>
               
        
        </Fragment>
        );
        }
    

    export default Nav
