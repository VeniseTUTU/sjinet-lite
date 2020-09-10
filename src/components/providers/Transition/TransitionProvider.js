import React, {Fragment} from "react";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import '../../../scss/transition.scss';


const TransitionProvider = (props) => {

 
return (
    
      <CSSTransitionGroup
          key={props.id}
          transitionName={props.className}
          transitionAppear={true}
          transitionLeave={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppearTimeout={500}
        >
        <Fragment>
        {props.children}
        </Fragment>
        </CSSTransitionGroup>
    
);
    
};

export default TransitionProvider ;
