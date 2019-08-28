import React, { Component } from 'react';
import anime from 'animejs'
import Moment from 'react-moment';
import "moment-timezone";
import Axios from 'axios'
import DetailedForecast from "../../components/hourlyForecastDetailed/hourlyForecastDetailed";

class HourlyForecast extends Component{

    constructor(props){
        super(props)
        this.state = {
            forecast: {},
            update:false,
            detailedUpdate:false,
            detailed:{},
            animated:false
        }

        this.location = JSON.parse(localStorage.getItem('location'))
    }

    
    componentDidUpdate = () => {
        if(!this.state.animated){
            anime({
                targets: '.anime',
                opacity : [0,1],
                translateX:[-64,0],
                delay: (el,i)=>i * 100,
                complete: ()=>{
                    this.setState({animated:true})
                }
            })
        }
        if(this.state.detailedUpdate){
            anime({
                targets: '.detailed-anime',
                opacity : [0,1],
                translateX:[-64,0],
                elasticity:0,
                easing: 'linear',
                duration: 400
            })
        }
        
    }

    get12HourForecast = () => {
        Axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${this.location.location.locationKey}?apikey=pn7wcvuaPM6B1lVZIDVM9NoQcRATG65y&details=true`)
        .then((res)=>{
          console.log(res.data)
          localStorage.setItem('hourlyForecast',JSON.stringify(res.data))
          console.log(localStorage.getItem('hourlyForecast'))
          this.setState({forecast:res.data,update:true})
        })
        .catch((err)=>{
          console.log(err)
        })
    }

    scrollDown = (page) => {
        var realPage = page - 1
        window.scrollTo({ top: window.innerHeight * realPage, behavior: "smooth" });
      };

    componentDidMount = () => {
        this.get12HourForecast()
    }

    setDetailed = (data) =>{
        this.setState({detailed:data,detailedUpdate:true})
    }

    render(){

        let {forecast,update} = this.state
        
        return(
            <React.Fragment>
                <div className="row align-items-center">      
                    {update ? forecast.map((element,i)=>{
                        return (
                            <div className="col-md-1 text-center anime" key={i} onClick={()=>this.setDetailed(element)}>
                                <div className="transparent hover-scale" style={{color:"whitesmoke"}}>
                                    <b><Moment format="hh:mm a">{element.DateTime}</Moment></b>
                                    <hr></hr>
                                    <img src="https://www.svgrepo.com/show/95505/stormy-cloud-with-rain-and-thunder.svg" alt="cloud" width="100%" style={{padding:'15px',filter:"invert(1)"}} />
                                    <hr></hr>
                                    <img src="https://www.svgrepo.com/show/100984/water-drop.svg" width="16px" style={{filter:"invert(1)"}} alt="precipitation"></img> <span>{element.PrecipitationProbability} %</span>
                                    <hr></hr>
                                    <img src="https://www.svgrepo.com/show/25774/high-temperature.svg" width="24px" style={{filter:"invert(1)"}} alt="temperature"></img>
                                    <p style={{fontSize:"20px"}}>{((element.Temperature.Value - 32) * 5/9).toFixed(0)}&deg;</p>
                                </div>
                            </div>
                        )
                    }): <div>Loading</div>}
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div className="row align-items-center">
                    <div className="col">
                        <div className="transparent detailed-anime">
                            {this.state.detailedUpdate ? <DetailedForecast data={this.state.detailed}></DetailedForecast>: <div className="text-center" style={{color:"whitesmoke",padding:"128px"}}><h3>Click on any hour to view detailed info</h3></div>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HourlyForecast