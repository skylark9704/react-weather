import React, { Component } from 'react';

class Page extends Component{

    render(){
        return (
            <div className="container-fluid" style={{height:"100vh"}}>
                <br></br>
                <h1 style={{color:"whitesmoke"}}>{this.props.title} </h1> 
                <div className="row h-100 align-items-center" style={{marginRight:"64px"}}>
                    <div className="col">
                    {this.props.children}
                    </div>
                </div>  
            </div>
        );
    }
}

export default Page;