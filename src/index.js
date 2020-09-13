import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './component/Route';

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div><Routes/></div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));