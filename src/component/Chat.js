import React, { Component } from 'react'
import axios from 'axios';
import '../style.css';

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuth : false,
            name: "",
            authenticatedKey: "",
            message : []
        }
        this.ChatHandler = this.ChatHandler.bind(this);

    }
    componentDidMount(){

     
            let input = prompt("Please Enter you Auth Code");
        var data = {"code": input}
        axios.post('http://localhost:4001/verify', data).then((Response)=>{
            console.log(Response.data)
        this.setState({
            isAuth: Response.data.isAuth,
            name : Response.data.name, 
            authenticatedKey: Response.data.authkey
        })

        }).catch((err)=>{console.log(err)});
        var url = "http://localhost:4001/messages";
        axios.get(url).then((Response)=>{
            this.setState({
                message: Response.data
            })
        }).catch((err)=>{console.log(err)});
       

    }

    ChatHandler(event){

        var message = this.message.value;
        var Key = Date.now();
        var name = this.state.name;
        
        var pairedData = {name: name, Key: Key, message : message, authkey : this.state.authenticatedKey};
        var posturl = "http://localhost:4001/addmessage";
        axios.post(posturl, pairedData).then((Response)=>{console.log(Response)}).catch((err)=>{console.log(err)});
        
        

        event.preventDefault();
        this.message.value = "";
        var url = "http://localhost:4001/messages";
        axios.get(url).then((Response)=>{
            this.setState({
                message: Response.data
            })
        }).catch((err)=>{console.log(err)});
    }
       


    

    render() {
        if(this.state.isAuth !== false){
            return (
                <div>

                <div className="row">
                    <div className="col-xl-6">
                    <div className="card mx-auto" style={{width: '90%'}}>
                    <div className="card-title" >
                    <br/>
                        <h4 className="" > &nbsp; &nbsp; {this.state.name} </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.ChatHandler} >
                            <textarea ref={(message)=> this.message = message} className="form-control" rows="10"></textarea>
                            <br/>
                            <button type="submit" className="btn btn-primary btn-lg">Send</button>
                            
                        </form>
                        
                    </div>
                </div>
                    </div>


                    <div className="col-xl-6">
                    <div className="container">
                    <div style={{  height: "400px", overflowY: 'scroll', bottom: '0'}}>

                    {this.state.message.map((list)=>{
                        return  <div className="messagecontainer text-white bg-primary">
                        <p style={{fontSize: '20px', lineHeight: '0'}}>{list.name}</p>
                    
                       <p style={{fontSize: '14px'}}>{list.message[0]} </p>
                        <br/>
                       
                    </div>
                    })}
                    
                   </div>
                    </div>
                    <br/><br/>
                   

                    </div>
                </div>
              

                    
                </div>
            )
        }
       else{
        return (
            <div className="text-center mx-auto" >
            <br/>
            <br/>
            <h1 className="display-5 text-center">Auth Failed</h1>
            
            <a className="btn btn-lg btn-primary" href='/chat'> Try Again</a>
         
                
            </div>
        )
       }
    }
}
