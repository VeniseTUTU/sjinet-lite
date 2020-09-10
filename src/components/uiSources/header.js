import React, {Component, useState,useEffect} from "react";
import AOS from 'aos';
import { NavLink, Link, withRouter } from 'react-router-dom';
import EscapeOutside from "react-escape-outside";
import {HeaderProvider} from "../providers";
import Search from "../uiSources/search";
import {Avatar} from "../Icons";
import '../../scss/header.scss';
AOS.init();
const BASE_URL = process.env.NODE_ENV === 'development' 
				 ? process.env.USE_BASE_URL_ENV
				 : process.env.USE_BASE_URL

const Header = (props) => {

 return(
      <HeaderProvider>
          {({
              Input,
              showMenuIcons,
              hideMenuIcons,
              toggleSearch,
              toggleShowMenu,
              handlelogout,
              handleEscapeOutside,
              cacheUserData,
                            
          }) => (
<>
{
  Input.displaySearch && <Search setpathKey={props.setpathKey} toggleSearch={()=>toggleSearch()} />
}


<div className="mainHeadWrap">
 { Input.displayICons && (
    <>
        <ul className="menu-iconn">
                <NavLink to="/movies">
               <li className="pe-7s-home pe-va"></li>
               </NavLink>
               <NavLink to="/library">
               <li className="pe-7s-albums pe-va mobb"></li>
               </NavLink>
               <NavLink to="/billing-setting">
               <li className="pe-7s-credit pe-va mobb"></li>
               </NavLink>
               
                <li onClick={toggleSearch} className="pe-7s-search pe-va"></li>
        </ul>
        <ul className="thtBBMenu-iconn">
            { Input.avatar =='' ?                  
	       <li className="pe-7s-user pe-va"></li> :
              
                <li>
                 <div className="avaTar">
  { (cacheUserData.user.length || Object.keys(cacheUserData.user).length) && cacheUserData.user.viewer.imageUrl
    ? <img src={cacheUserData.user.viewer.imageUrl} />
    : <Avatar />
               
  }
                 </div>
                </li>
            }
                <div onClick={toggleShowMenu} className="initIal">
                {
                  cacheUserData.user.length || Object.keys(cacheUserData.user).length 
                  ?  cacheUserData.user.viewer.lastName 
                  :''
                }
                  
                    <span className="pe-7s-angle-down pe-va"></span>
                { Input.showMenu && (
                    <EscapeOutside onEscapeOutside={ handleEscapeOutside }>
                   <div className="hdshortMenu">
                  
                     <ul className="">
                       <NavLink to="/library">
                         <li><span className="pe-7s-albums pe-va"></span>Library</li>
                       </NavLink>
                          <NavLink to="/billing-setting">
                          <li><span className="pe-7s-credit pe-va"></span>Billing</li>
                          </NavLink>
                          <NavLink to="/account-setting">
                          <li><span className="pe-7s-config pe-va"></span>Setting</li>
                          </NavLink>
                       
                        <li onClick={handlelogout}><span className="pe-7s-power pe-va"></span>Log Out</li>
                       
                     </ul>
                    
                   <b className="border-notch notch"></b>
                    <b className="notch"></b>
                   </div>
                   </EscapeOutside>
                )}
                 </div>
        </ul>
        </>
        )
        }
        <ul className="crumbRight">
            <li>
              <div>
                
                <img src={`${BASE_URL}images/sjinet_official_logo.png`} alt="sjinet_logo" />
		          </div>
            </li>
        </ul>
  
      </div>
    </>
          )}
      </HeaderProvider>

  
 
    );
         
}

export default withRouter (Header);


