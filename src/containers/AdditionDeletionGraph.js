import React, { Component } from 'react';
import '../css/AdditionDeletionGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, VerticalRectSeries, YAxis} from 'react-vis';

class AdditionDeletionGraph extends Component {

  render () {
    //console.log(this.props.additionStats)
    return (
      <div className='chart'>
        <XYPlot
          margin={{left: 50,bottom: 100}}
          xType="time"
          height={300}
          width= {500}
          stackBy="y"
        >
        <XAxis tickLabelAngle={-90}/>
        <YAxis/>
        <VerticalRectSeries data={this.props.additionStats} />
        <VerticalRectSeries data={this.props.deletionStats} />
        </XYPlot>
      </div>
    )
  }
}

export default AdditionDeletionGraph;
