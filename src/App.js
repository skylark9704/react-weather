import React from "react";
import "./App.css";
import { Parallax } from "react-parallax";
import Moment from "react-moment";
import "moment-timezone";
import Axios from "axios";
import Page from "./components/page/page";


import Time from "./components/time/time";
import Events from "./components/events/events";
import HourlyForecast from "./components/hourlyForecast/hourlyForecast";
import DailyForecast from "./components/dailyForecast/dailyForecast";
import News from "./components/news/news";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      temperature: {},
      weather:"",
      feelTemperature:{},
      wind: {},
      humidity:"",
      uv:{},
      visibility:{},
      cloudCover:"",
      pressure:{},
      pastTemp:{},
      precipitation:{},
      localTime:"",
      update:false,
      event:false,
      horly:false,
      eventList:{},
      location:{},
      hourly:[],
      detailed:{}
    };
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(this.storeLocation);
  };

  storeLocation = position => {
    console.log(position.coords);
    Axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=pn7wcvuaPM6B1lVZIDVM9NoQcRATG65y&q=${position.coords.latitude}%2C${position.coords.longitude}`)
      .then(res => {
		console.log(res.data);
		localStorage.setItem("location",JSON.stringify({location:{locationKey:res.data.Key,city:res.data.LocalizedName,country:res.data.Country.LocalizedName,state:res.data.AdministrativeArea.LocalizedName}}))
        this.setState({location:{locationKey:res.data.Key,city:res.data.LocalizedName,country:res.data.Country.LocalizedName,state:res.data.AdministrativeArea.LocalizedName}})
        this.currentCondition()
      })
      .catch(err => {
        console.log(err);
      })
  };

  currentCondition = ()=>{
    var locationKey = this.state.location.locationKey
    console.log(locationKey)
    Axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=pn7wcvuaPM6B1lVZIDVM9NoQcRATG65y&details=true`)
      .then((res) => {
        var temperature = res.data[0].Temperature
        var feelTemperature = res.data[0].RealFeelTemperature
        var humidity = res.data[0].RelativeHumidity
        var wind = res.data[0].Wind
        var uv = {index: res.data[0].UVIndex, text: res.data[0].UVIndexText}
        var visibility = res.data[0].Visibility
        var cloudCover = res.data[0].CloudCover
        var pressure = res.data[0].Pressure
        var precipitation = res.data[0].PrecipitationSummary
        var pastTemp = res.data[0].TemperatureSummary
        var weather = res.data[0].WeatherText
        var localTime = res.data[0].LocalObservationTime

        this.setState({
          temperature,
          humidity,
          feelTemperature,
          wind,
          uv,
          visibility,
          cloudCover,
          precipitation,
          pressure,
          pastTemp,
          weather,
          localTime,
          update:true
        })

        console.log(this.state);
        
      })
      .catch((err) => {
        console.log(err);
        
      })
  }

  
  scrollDown = (page) => {
	var realPage = page - 1
    window.scrollTo({ top: window.innerHeight * realPage, behavior: "smooth" });
  };

  update = (data)=>{
	  console.log(data.DateTime)
	return <Moment format="hh:mm a">{data.DateTime}</Moment>
  }

  componentDidMount = () => {
	this.getLocation()
  };

  selected = (data) =>{
	  console.log(data)
	  this.setState({detailed:data})
  }

  componentWillUnmount = () => {
	clearInterval(this.timeInterval);
	//b2c591670d614fcebc998880e456a69a
  };

  render() {
	
    return (
      <div>
        <Parallax blur={0} bgImage={"http://hdqwalls.com/wallpapers/forest-mountains-sunset-cool-weather-minimalism-yn.jpg"} bgImageAlt="the cat" strength={1200}>
		<div style={{textAlign:"center",position:"fixed",right:"16px",top:"16px"}}>
		<div style={{float:"right",marginBottom:"16px"}}><div onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })} className="transparent hover-scale" style={{height:"64px",width:"64px",borderRadius:"50px",padding:"16px",cursor:"pointer"}} ><img src="https://www.svgrepo.com/show/9399/home.svg" style={{filter:"invert(1)"}} alt="home" width="32px"></img> </div></div>
		<br></br>
		<div style={{float:"right",marginBottom:"16px"}}><div onClick={()=>window.scrollTo({ top: window.innerHeight, behavior: "smooth" })} className="transparent hover-scale" style={{height:"64px",width:"64px",borderRadius:"50px",padding:"16px",cursor:"pointer"}} ><img src="https://www.svgrepo.com/show/6306/clock.svg" style={{filter:"invert(1)"}} alt="home" width="32px"></img> </div></div>
		<br></br>
		<div style={{float:"right",marginBottom:"16px"}}><div onClick={()=>window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" })} className="transparent hover-scale" style={{height:"64px",width:"64px",borderRadius:"50px",padding:"16px",cursor:"pointer"}} ><img src="https://www.svgrepo.com/show/93554/daily-calendar-page-on-day-23.svg" style={{filter:"invert(1)"}} alt="home" width="32px"></img> </div></div>
		</div>
		
          <Page>
          <div className="row align-items-center" style={{ height: "100vh" }}>
              <div className="col-md text-center">
                <Time></Time>
              </div>

              <div className="col-md-8">
                <div className="row h-100 align-items-center" style={{ padding: "16px" }}>
                  <div className="col">
                    <div className="transparent">
                      <div className="row align-items-center" style={{ padding: "12px" }}>
                        <div className="col-md">
                          <div className="row align-items-center">
                            <div className="col-md-3 text-center">
                              <div className="temperature-display">
                                <img src="https://www.svgrepo.com/show/95505/stormy-cloud-with-rain-and-thunder.svg" width="150px"/> <span className="temp">{this.state.update && this.state.temperature.Metric.Value.toFixed(0)}&deg;</span>
                              </div>
                            </div>

                            <div className="col-md-3 text-center">
                              <div className="weather">
                                <p><b>{this.state.location.city}</b></p>
                                {this.state.update && this.state.weather}
                                <hr></hr>
                                <div className="feel-temp"><i>Feels like <span>{this.state.update && this.state.feelTemperature.Metric.Value.toFixed(0)}&deg;</span></i></div>
                              </div>
                              
                            </div>

                            <div className="col-md-6 text-left ">
                              <div className="weather">
                                <Events></Events>
                              </div>
                              
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <hr />
                      <div
                        className="row align-items-center row-flex"
                        style={{ padding: "16px" }}
                      >
                        <div
                          className="col-md-6 text-center border-right"
                          style={{
                            paddingTop: "12px",
                            paddingBottom: "12px",
                          }}
                        >
							<div className="row">
								<div className="col-md-6 text-center border-right">
									<div className="info">
										<img src="https://www.svgrepo.com/show/100984/water-drop.svg" width="32px"></img>
										<h5>Precipitation</h5>
										<p className="display-info">{this.state.update && this.state.precipitation.Precipitation.Metric.Value} mm</p>
									</div>
								</div>

								<div className="col-md-6 text-center" style={{paddingTop: "12px",paddingBottom: "12px"}}>
									<div className="info">
										<img src="https://www.svgrepo.com/show/26690/humidity.svg" width="32px"></img>
										<h5>Humidity</h5>
										<p className="display-info">{this.state.update && this.state.humidity} %</p>
									</div>
								</div>
							</div>
						  	<hr></hr>
							<div className="row">
							<div
                          className="col-md-6 text-center border-right"
                          style={{
                            paddingTop: "12px",
                            paddingBottom: "12px"
                          }}
                        >
                          <div className="info">
                            <img src="https://www.svgrepo.com/show/2010/rain.svg" width="32px"></img>
                            <h5>Rainfall</h5>
                            <p className="display-info">{this.state.update && this.state.precipitation.Precipitation.Metric.Value} %</p>
                          </div>
                        </div>

                        <div
                          className="col-md-6 text-center"
                          style={{
                            paddingTop: "12px",
                            paddingBottom: "12px"
                          }}
                        >
                          <div className="info">
                          <img src="https://www.svgrepo.com/show/86678/uv-rays-of-sun.svg" width="32px"></img>
                          <h5>UV Index</h5>
                          <p className="display-info">{this.state.update && this.state.uv.text}</p>
                          </div>
                        </div>
							</div>
                          
                        </div>

                        

						<div className="col-md-6 text-left" style={{color:"whitesmoke"}}>
							<img src="https://www.svgrepo.com/show/12941/newspaper.svg" width="32px" style={{filter:"invert(1)"}} alt="events"></img><span> News</span>
							<hr></hr>
							<News></News>
						</div>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Page>

          <Page title="Hourly Forecast">
				<HourlyForecast></HourlyForecast>
          </Page>

		  <Page title="Daily Forecast">
				<DailyForecast></DailyForecast>
          </Page>
        </Parallax>
      </div>
    );
  }
}


export default App;
