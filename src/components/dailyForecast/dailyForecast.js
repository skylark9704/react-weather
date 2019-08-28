import React, { Component } from 'react';
import Axios from 'axios';
import DetailedForecast from '../../components/hourlyForecastDetailed/hourlyForecastDetailed'
import anime from 'animejs'
import Moment from 'react-moment';
import "moment-timezone";

class DailyForecast extends Component{

    constructor(props){
        super(props)
        this.state = {
            forecast:{},
            update:false,
            detailed:{},
            detailedUpdate:false,
            animated:false,
            location:JSON.parse(localStorage.getItem('location'))
        }

    }

    componentDidMount = () => {
        this.getDailyForecast()
    }

    componentDidUpdate = () => {
        if(!this.state.animated){
            anime({
                targets: '.daily-anime',
                opacity : [0,1],
                translateX:[-64,0],
                delay: (el,i)=>i * 100,
                complete: ()=>{
                    this.setState({animated:true})
                }
            })
        }

        anime({
            targets: '.detailed-anime',
            opacity : [0,1],
            translateX:[-64,0],
            elasticity:0,
            easing: 'linear',
            duration: 300
        })
    }

    setDetailed = (data) => {
        this.setState({detailed:data})
    }

    getDailyForecast = () => {
        Axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.location.location.locationKey}?apikey=pn7wcvuaPM6B1lVZIDVM9NoQcRATG65y&details=true`)
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('dailyForecast',JSON.stringify(res.data.DailyForecasts))
            this.setState({forecast:res.data.DailyForecasts,update:true})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        let {forecast,update} = this.state
        return(
            <React.Fragment>
                <div className="row align-items-center">      
                    {update ? forecast.map((element,i)=>{
                        return (
                            <div className="col-md text-center anime" key={i}>
                                <div className="transparent" style={{color:"whitesmoke"}}>
                                    <b><Moment format="MMMM DD, ddd">{element.Date}</Moment></b>
                                    <hr></hr>
                                    <div className="row">
                                        <div className="col text-center border-right">
                                            <h5>Day</h5>
                                            <hr></hr>
                                            {element.Day.IconPhrase}
                                            <hr></hr>
                                            <div className="info">
                                                <img src="https://www.svgrepo.com/show/2010/rain.svg" width="32px" alt="thor"></img>
                                                <span className="display-info"> {element.Day.RainProbability} %</span>
                                            </div>
                                            <hr></hr>
                                            <div className="info">
                                                <img src="https://www.svgrepo.com/show/100984/water-drop.svg" width="32px" alt="aquaman"></img>
                                                <span className="display-info"> {element.Day.PrecipitationProbability} %</span>
                                            </div>
                                        </div>

                                        <div className="col text-center">
                                            <h5>Night</h5>
                                            <hr></hr>
                                            {element.Night.IconPhrase}
                                            <hr></hr>
                                            <div className="info">
                                                <img src="https://www.svgrepo.com/show/2010/rain.svg" width="32px" alt="thor"></img>
                                                <span className="display-info"> {element.Night.RainProbability} %</span>
                                            </div>
                                            <hr></hr>
                                            <div className="info">
                                                <img src="https://www.svgrepo.com/show/100984/water-drop.svg" width="32px" alt="aquaman"></img>
                                                <span className="display-info"> {element.Night.PrecipitationProbability} %</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <img src="https://www.svgrepo.com/show/105472/sunrise.svg" width="48px" style={{filter:"invert(1)",marginBottom:"8px"}} alt="precipitation"></img>
                                    <div className="row">
                                        <div className="col border-right">
                                            Rise
                                            <br></br>
                                            <Moment format="hh:mm a">{element.Sun.Rise}</Moment>
                                        </div>

                                        <div className="col">
                                            Set
                                            <br></br>
                                            <Moment format="hh:mm a">{element.Sun.Set}</Moment>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <img src="https://www.svgrepo.com/show/6390/moon.svg" width="48px" style={{filter:"invert(1)",marginBottom:"8px"}} alt="precipitation"></img>
                                    <div className="row">
                                        <div className="col border-right">
                                            Rise
                                            <br></br>
                                            <Moment format="hh:mm a">{element.Moon.Rise}</Moment>
                                        </div>

                                        <div className="col">
                                            Set
                                            <br></br>
                                            <Moment format="hh:mm a">{element.Moon.Set}</Moment>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <span style={{fontSize:"32px"}}>{((element.Temperature.Maximum.Value - 32) * 5/9).toFixed(0)}&deg;</span>
                                    <img src="https://www.svgrepo.com/show/25774/high-temperature.svg" width="24px" style={{filter:"invert(1)",marginBottom:"12px"}} alt="temperature"></img>
                                    
                                    <span style={{fontSize:"32px"}}>{((element.Temperature.Minimum.Value - 32) * 5/9).toFixed(0)}&deg;</span>
                                </div>
                            </div>
                        )
                    }): <div>Loading</div>}
                </div>
            </React.Fragment>
        )
    }
}

export default DailyForecast