var React = require('react');
var path = require('path');
const NavLink = require('react-router-dom').NavLink;
const withRouter = require('react-router-dom').withRouter;


class SigninPage extends React.Component {
        constructor(props){
            super(props);
            this.state={
              email: '',
	      password: ''
	    };
	
	 this.handleChangeE = this.handleChangeE.bind(this);
	 this.handleChangeP = this.handleChangeP.bind(this);
	 this.handleSubmit = this.handleSubmit.bind(this);
	  
        }
	
handleChangeE(event) {
    this.setState({email: event.target.value});
}
handleChangeP(event) {
    this.setState({password: event.target.value});
}

handleSubmit(e) {
    
    e.preventDefault();
    const {email, password} = this.state;
    const {history} = this.props;
    $('#exampleModal').modal('hide');
    history.push('/tvshows');
    
}


        render(){
        
        return(

  <section>
        
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title dsl-title" id="exampleModalLabel">
		Log in to JS Tv
	</h5>
        <button type="button" className="close dsl-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form onSubmit={this.handleSubmit}>
      <div className="modal-body regformWrapper">
        <section className="registerWrapper">
	  
		<div className="fieldWrap">
		<label htmlFor="email"></label>
		<input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChangeE} required/>
		<span className="floating-label">Email</span>
		</div>
		
		<div className="fieldWrap">
		<label htmlFor="password"></label>
		<input type="password" id="password" value={this.state.password} onChange={this.handleChangeP} name="password" required/>
		<span className="floating-label">Password</span>
		</div>
		
	</section>
      </div>
      <div className="modal-footer loginsubm fffsc">
	<section className="registerWrapper centerButton">
        <input type="submit" name="" value="LOG IN" className="loginField" />
	</section>
      </div>
      </form>
    </div>
  </div>
</div>

    </section>

);
    }

}

module.exports = withRouter (SigninPage);



