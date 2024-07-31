import './App.css';
import NavBar from './components/NavBar'
import React, { Component } from 'react'
import Newscomponent from './components/Newscomponent';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  pageSize = 9
  state={progress:10}
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<Newscomponent setprogress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />}> </Route>
            <Route exact path='/business' element={<Newscomponent setprogress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />}> </Route>
            <Route exact path='/science' element={<Newscomponent setprogress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />}> </Route>
            <Route exact path='/health' element={<Newscomponent setprogress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />}> </Route>
            <Route exact path='/technology' element={<Newscomponent setprogress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />}> </Route>
            <Route exact path='/sports' element={<Newscomponent setprogress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />}> </Route>
            <Route exact path='/entertainment' element={<Newscomponent setprogress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}> </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}