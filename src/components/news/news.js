import React, { Component } from 'react';
import Axios from 'axios'
import Moment from "react-moment";
import anime from 'animejs'
import "moment-timezone";

class News extends Component{

    constructor(props){
        super(props)
        this.state = {
            news:[],
            update:false
        }
    }

    getNews = () => {
        Axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=b2c591670d614fcebc998880e456a69a`)
        .then((res)=>{
            console.log(res.data)
            this.setState({news:res.data.articles,update:true})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getNews()
    }

    componentDidUpdate = () => {
        anime({
            targets: '.news-anime',
            opacity : [0,1],
            translateY:[-64,0],
            delay:(el,i) =>i * 200,
        })
    }

    render(){
        let {news , update} = this.state
        return(
            <div className="customscrollbar" style={{maxHeight:'300px',overflowY:"scroll",overflowX:"hidden",paddingRight:"4px"}}>
                    <React.Fragment>{update ? news.map((element,i)=>{
                        return (
                            <div className="news-anime" key={i}>
                                <div className="text-left transparent" style={{fontSize:"1vw",padding:"0"}}>
                                    <div className="row">
                                        <div className="col-4">
                                        <img src={element.urlToImage} width="100%" height="100%" alt="news"></img>
                                        </div>
                            
                                        <div className="col-8 text-right" style={{fontSize:"0.8vw",padding:"0"}}>
                                            <p className="title" style={{width:"90%"}}><b>{element.title}</b></p>
                                            <p className="content" style={{width:"90%"}}>{element.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{margin:"4px"}}></hr>
                            </div>
                        )
                    }):<div className="text-center">Loading</div>}
                    </React.Fragment>
                </div>
        )
    }
}

export default News;