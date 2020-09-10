import React, {Fragment} from "react";
import {withRouter, useHistory } from 'react-router-dom';
import {SearchVideoProvider} from '../providers';
import VideoBox from '../uiSources/videobox';
import ScrollContainer from 'react-indiana-drag-scroll';
import {SearchSpinner} from '../loaders';
import '../../scss/search.scss';
import AOS from 'aos';
AOS.init();

const Search = (props) => {

  let history = useHistory();

const directVideo = (value) => {
  const ch = history.location.pathname.split('/');
  ch.includes('watch') 
  ? window.location.reload(false)
  : history.push('/watch/'+value);
/*
  history.push('/watch/'+value);
  const keyRand = Math.random()
           .toString(36)
           .replace(/[^a-z]+/g, '')
           .substring(0,9);
  props.setpathKey(keyRand);
  */
} 
 
  
  return(
   
<SearchVideoProvider>
  {({ Input,data,handleInputChange,handleSubmit}) => (

    <Fragment>
 <section className="Search" data-aos="zoom-in-up"  data-aos-once>

 <section className="Search__titleBar">
    <section className="Search__wedge">
      <section className="Search__wedge__top">

        <div  className="Search__leftContent">
           <span onClick={()=>props.toggleSearch()} className="back pe-7s-angle-left"></span>
        </div>

        <div className="Search__middleContent">
        <form onSubmit={handleSubmit}>
            <input 
              type='text' 
              name='keyword'
              id='keyword'
              defaultValue={Input.searchValue}
              onChange={(e)=>handleInputChange(e)}
              placeholder="Search Videos & Shows" 
            />
            <span onClick={(e)=>handleInputChange(e)} className="pe-7s-search"></span>
        </form>
         
            
        </div>

        <div className="Search__rightContent">
            
        </div>

      </section>
    </section>
   </section>
   <ScrollContainer className="scroll-container" >
   <section className="Search__body">
   <section className="Search__wedge">
{
  Input.IsLoadedSoft && <SearchSpinner/>
}
{ 
   !Input.IsLoadedSoft || (data && data.length)
   ? <VideoBox onClick={(value)=>directVideo(value)} contents={data} videoClass={'searchh'} />
   : ''
}
{
  !(data && data.length) && !Input.IsLoadedSoft && <div className='Search__nocontent'>{Input.searchRes}</div>
}
</section>
</section>
</ScrollContainer>
 </section>

	
</Fragment>

  )}

</SearchVideoProvider>

    );
    
}

module.exports = withRouter (Search);