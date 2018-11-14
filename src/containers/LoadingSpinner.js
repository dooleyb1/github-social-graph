import React, { Component } from 'react';
import '../css/LoadingSpinner.css';
import Loader from 'react-loader-spinner';

class LoadingSpinner extends Component {

  render () {
    return (
      <div className="repo-graph-loading-spinner">
        <Loader
          type="Bars"
          color="#4DD0E1"
          height="70"
          width="70"
        />
      <p style={{color: '#4DD0E1'}}> Fetched {this.props.fetched} {this.props.fetchString}</p>
      </div>
    )
  }
}

export default LoadingSpinner;
