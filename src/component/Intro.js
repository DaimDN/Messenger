import React, { Component } from 'react'
import Chat from './Chat';
import axios from 'axios';

export default class Intro extends Component {
    constructor(props){
        super(props);
        this.state={
           userdata : [{group: "Mughals", name : "Daim"}]
        }
        this.FormHandler = this.FormHandler.bind(this);

       

    }


        FormHandler(event){
            var group = this.group.value;
            var name = this.name.value;
            var code = Date.now();

            var setdata = {group: group, name: name, code : code};

            this.setState((prevState)=>{
                return{
                   userdata: prevState.userdata.concat(setdata)
                }
                
            })

            console.log(setdata);

            var posturl = "https://messengerback.herokuapp.com/user";
            axios.post(posturl, setdata).then((Response)=>{console.log(Response)}).catch((err)=>{console.log(err)});

            alert("Dear " + name + " , Your code is " + code);

            window.location.href = "/chat";
      event.preventDefault();

  

        }

    render() {
        
        return (
            <div className="mx-auto text-center">
                <div style={{width: '40%', margin: 'auto', paddingTop: '100px'}}>
                <form onSubmit={this.FormHandler} >
                    <input type="text" className="form-control" placeholder="Enter Name" ref={(a)=>this.name =a} required/>
                    <br/>
                    <select className="form-control" ref={(b)=> this.group = b}>
                        {this.state.userdata.map((list)=>{
                            return <option value={list.group}>{list.group}</option>
                        })}

                    </select>
                    <br/>
                    <button type="submit" style={{borderRadius: '20px'}} className="btn btn-primary btn-lg">Start</button>
                </form>

                </div>
            </div>
        )
    }
}
