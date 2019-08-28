import React, { Component } from 'react';
import Moment from "react-moment";
import "moment-timezone";
import DoubleButton from "../../components/calendarButton/calendarButton";
import ApiCalendar from 'react-google-calendar-api';
import anime from "animejs";


class Events extends Component{

    constructor(props){
        super(props)
        this.state = {
            eventList:{},
            event:false
        }

        this.eventRef = React.createRef()

        ApiCalendar.onLoad(() => {
            ApiCalendar.listenSign(this.listEvents());
        });
    }

    componentDidMount = () => {
        
    }

    componentDidUpdate = () => {
        anime({
            targets: '.event-anime',
            opacity : [0,1],
            translateY:[-64,0],
            delay:(el,i) =>i * 200,
        })
      }

    listEvents = () => {
        if (ApiCalendar.sign){
            ApiCalendar.listUpcomingEvents(5,'primary')
            .then(({result}) => {
              var eventList = result.items
              this.setState({eventList,event:true})
              console.log(eventList)
            });
        }
       
    }

    render(){
        let {eventList} = this.state
        
        return(
            <React.Fragment>
                <img src="https://www.svgrepo.com/show/12061/calendar.svg" width="32px" style={{filter:"invert(1)"}} alt="events"></img><span> Events</span>
                <hr></hr>
                <div className="customscrollbar" style={{maxHeight:'200px',overflowY:"scroll",overflowX:"hidden",paddingRight:"4px"}}>
                    <React.Fragment>{this.state.event ? eventList.map((element,i)=>{
                        return (
                            <div className="event-anime" key={i}>
                                <div className="text-left transparent" style={{fontSize:"1vw"}}>
                                    <div className="row">
                                        <div className="col">
                                        {element.summary}
                                        </div>
                            
                                        <div className="col text-right" style={{fontSize:"0.8vw"}}>
                                            <i><Moment format="DD MMM">{element.start.dateTime}</Moment></i>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{margin:"4px"}}></hr>
                            </div>
                        )
                    }):<div className="text-center">Loading</div>}
                    </React.Fragment>
                </div>
            </React.Fragment>
        )
    }
}

export default Events