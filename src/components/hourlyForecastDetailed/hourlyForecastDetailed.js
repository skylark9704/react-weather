import React, { Component } from 'react';
import Moment from 'react-moment';

class DetailedForecast extends Component{
    constructor(props){
        super(props)
        this.state = {
            forecast:this.props.data,
            update:false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.data !== undefined){
            return {forecast:nextProps.data,update:true}
        }
    }

    componentDidUpdate = () => {
       
    }

    render(){
        
        return(
            <div className="row align-items-center text-center" style={{color:"whitesmoke", padding:"16px"}} >
                <div className="col-md-2">
                    <img src="https://www.svgrepo.com/show/95505/stormy-cloud-with-rain-and-thunder.svg" style={{filter:"invert(1)"}} alt="thunder" width="128px"></img>  <span style={{fontSize:"6vw"}}> {((this.state.forecast.Temperature.Value - 32) * 5/9).toFixed(0)}&deg;</span>
                </div>

                <div className="col-md-3 text-left">
                    <div className="weather" style={{fontSize:"2vw"}}>
                        {this.state.update && this.state.forecast.IconPhrase} at <b><Moment format=" hh:mm a">{this.state.forecast.DateTime}</Moment></b>
                        <hr></hr>
                        <div className="feel-temp" style={{fontSize:"1.5vw"}}><i>Feels like <span>{((this.state.forecast.RealFeelTemperature.Value - 32) * 5/9).toFixed(0)}&deg;</span></i></div>
                    </div>
                    
                </div>

                <div className="col-md border-right">
                    <div className="info">
                        <img src="https://www.svgrepo.com/show/100984/water-drop.svg" width="32px"></img>
                        <h5>Precipitation</h5>
                        <p className="display-info">{this.state.forecast.PrecipitationProbability} %</p>
                    </div>
                </div>
                
                <div className="col-md border-right">
                    <div className="info">
                        <img src="https://www.svgrepo.com/show/2010/rain.svg" width="32px" alt="thor"></img>
                        <h5>Rainfall</h5>
                        <p className="display-info">{this.state.forecast.RainProbability} %</p>
                    </div>
                </div>

                <div className="col-md border-right">
                    <div className="info">
                        <img src="https://www.svgrepo.com/show/86678/uv-rays-of-sun.svg" width="32px"></img>
                        <h5>UV Index</h5>
                        <p className="display-info">{this.state.forecast.UVIndexText}</p>
                    </div>
                </div>

                <div className="col-md border-right">
                    <div className="info">
                        <img src="https://www.svgrepo.com/show/132801/clouds-and-sun.svg" width="32px"></img>
                        <h5>Cloud Cover</h5>
                        <p className="display-info">{this.state.forecast.CloudCover} %</p>
                    </div>
                </div>

                <div className="col-md">
                    <div className="info">
                        <img src="https://www.svgrepo.com/show/203996/visibility-eye.svg" width="32px"></img>
                        <h5>Visibility</h5>
                        <p className="display-info">{(this.state.forecast.Visibility.Value * 1.60934).toFixed(1)} km</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedForecast