var React = require('react');
var path = require('path');
const NavLink = require('react-router-dom').NavLink;


class Userfavourites extends React.Component {
        constructor(props){
            super(props);
	    this.state={
	    data:[],
	    isLoaded: false,
		isdeleting: false,
		fetchStatus:null,
            
	   };
	this._nodes = new Map();
	this._delnodes = new Map();
	
        this._playOnhover = this.playOnhover.bind(this);
        this._pauseOnLeave = this.pauseOnLeave.bind(this);
	this._deleteHistoryOnClick = this._deleteHistoryOnClick.bind(this);
	this. aboutcontroller = new AbortController();
        }
	
componentDidMount(){

  fetch(process.env.API_URL+'userfavourites/0', {signal: this.aboutcontroller.signal})
  .then( (response) => {
	if (response.ok) {
	    return response.json();
	}else{
	    
	   throw new Error('No Data Found');
	    
	}
    })
    .then(
	(result) => {

		if(result.data.length >=1){

			this.setState({
		data: result.data,
		isLoaded: true,
		fetchStatus:'complete',
	   });
		}
	   
	   const count = result.data.length;
	   this.props.getPropsFromFav(count);
	   
	}
    )
    .catch((error) => {
	 this.setState({
		data: [],
		fetchStatus:'complete',
		
	   });
	
    });	
 
 
}
componentWillUnmount(){
   this.aboutcontroller.abort()
}

playOnhover(e, i){
  const node = this._nodes.get(i);
  $(`#${node.id}`).hoverPlay();
  
};

pauseOnLeave(e, i){
  const node = this._nodes.get(i);
  node.pause();
};

_deleteHistoryOnClick(e, i){
    const delnode = this._delnodes.get(i);
    const delnodeId = delnode.id;
    const apidata={
	userId : "0000000",
	itemId : delnode.id
	
};
  
    // submit data to api
    $.ajax({

        type : "POST",
        url: process.env.API_URL+"deletefavourites/0",
        data : JSON.stringify(apidata),
	beforeSend: (data) => {
	 this.setState({isdeleting: true}); 
        },
        success : (response)=> {
	    const datav = this.state.data.filter(dt => dt.id !== delnodeId)
	    this.setState({
		data: datav,
		isdeleting: false
		});
	    const count = datav.length;
	    this.props.getPropsFromFav(count);
	}
    });
    
}
	
        render(){
		
			const count = this.state.data.length;
        
        return(
	
	       <div className="searResultWrapper">
	           { this.state.fetchStatus ==null ? <div className="noResult2">loading..</div>:
				 
				 count <= 0 ? <div className="noResult2">no favourite video found. Videos you add to favourite will show here.</div>: 	 
		     this.state.data.map((content, i)=> (
	       <div key={content.id} className="cell" >
	       { this.state.isdeleting
	        ? <div className="LibOverlayPr">
		    <span className="pe-7s-trash pe-va"></span>
		  </div>
	        : <div id={content.id} ref={c => this._delnodes.set(i, c)} onClick={e => this._deleteHistoryOnClick(e, i)}className="LibOverlay">
		    <span className="pe-7s-trash pe-va"></span>
		 </div>
	       }
	         
		<NavLink to={content.itemLink}> 
		  
		  <video id={content.id} key={content.id} ref={c => this._nodes.set(i, c)}
		        onPointerOver={e => this.playOnhover(e, i)}
			onPointerOut={e => this.pauseOnLeave(e, i)}	
			poster={content.itemImage} data-play="hover" muted="muted">
                        
                        Your browser does not support HTML5 video.
                  </video>
		</NavLink>
		
		
           </div>
       ))
		     
		     
			 }
			 
	       </div>
	);
    }
}

module.exports = Userfavourites;


