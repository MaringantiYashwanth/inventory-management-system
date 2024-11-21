import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {

  return (
	  <Router>
	  	<Routes>
	  		<Route exact path="/" component={HomePage} />
	  		{/* Add more routes as needed */}
	  	</Routes>
	  </Router>
  );
}

export default App;
