import React, { Component } from 'react';
import Moment from "react-moment";
import "moment-timezone";

class Time extends Component{
    constructor(props){
        super(props)
        this.state = {
            time: new Date()
        }
    }

    tick = () => {
        this.setState({ time: new Date() });
    };

    componentDidMount = () => {
        this.interval = setInterval(()=>this.tick(),1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
      };
    render(){
        return(
            <React.Fragment>
                <div className="date-display">
                  <Moment format="dddd">{this.state.time}</Moment>
                </div>
                <div className="time-display">
                  <Moment format="hh:mm a">{this.state.time}</Moment>
                </div>
                <div className="date-display">
                  <Moment format="LL">{this.state.time}</Moment>
                </div>
            </React.Fragment>  
        )
    }
}

export default Time