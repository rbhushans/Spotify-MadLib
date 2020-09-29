import React, { Component } from 'react';
import loginSVG from '../log_in.svg';

/**
 * Our login page
 * Has a login button that hit's the login url
 */
export default class Login extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {width: 0, height: 0}
  //   this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  // }
  // componentDidMount() {
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }
  
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }
  
  // updateWindowDimensions() {
  //   this.setState({ width: window.innerWidth, height: window.innerHeight });
  // }

  render() {
    //let w = (width < 500) ? '40%' : '20%'
    return (
      // <div>
      // <div className="title">
        
      // </div>
      
      <div style={{position: 'absolute', top: 0, right: 0, bottom:0, left: 0, 'z-index': 0, 'background-color':'#394053'}}>
        <div className='login'>
          <div className='title'>
            <h1>Spotify Mad Libs</h1>
          </div>
          <div className='about'>
            <h2>Spotify Mad Libs is a phrasal template game that involves your favorite artists and songs. Login to start the fun!</h2>
          </div>
          <div style={{width: '40%'}}>
            <a href="/login" dangerouslySetInnerHTML={{__html: loginSVG}}></a>
          </div>
        </div>
      </div>
    );
  }
}
