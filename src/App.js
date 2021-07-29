import React from 'react';
import './App.css';
import ListOfIssues from './Components/ListOfIssues.js';
import icons from 'glyphicons';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {browserHistory} from 'react-router-dom';

function App() {
  return (
  	<Router>
	    <div className="App">
	    	<Switch>
	      		{/*<ListOfIssues/>*/}

	      		 <Route exact path="/" component={ListOfIssues} />
	      	</Switch>
	    </div>
	</Router>
  );
}

export default App;
