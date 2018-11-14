import React, { Component } from 'react';
import '../css/LoadingSpinner.css';
import Loader from 'react-loader-spinner';

class LoadingSpinner extends Component {

  render () {
    return (
      <div>
        <Loader
          type="Bars"
          color="#4DD0E1"
          height="100"
          width="100"
        />
        <p style={{color: '#4DD0E1'}}> Fetched {this.props.commitsFetched} commits... </p>
      </div>
    )
  }
}

export default LoadingSpinner;
