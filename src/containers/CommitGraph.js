import React, { Component } from 'react';
import '../css/CommitGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, ChartLabel, XAxis, YAxis} from 'react-vis';

class CommitGraph extends Component {

  render () {

      if(!this.props.graphData){
        return(<div></div>)
      } else{
        return (
          <div className='chart'>
            <XYPlot
              margin={{left: 50,bottom: 100}}
              xType="time"
              height={300}
              width= {500}
            >
            <XAxis tickLabelAngle={-90}/>
            <YAxis/>
            <ChartLabel
              text="Commits"
              className="alt-y-label"
              includeMargin={true}
              xPercent={0.02}
              yPercent={0.1}
              style={{
                transform: 'rotate(-90)',
                textAnchor: 'end',
                marginLeft: '-150'
              }}
              />
            <LineSeries data={this.props.graphData} />
            </XYPlot>
          </div>
        )
      }
  }
}

export default CommitGraph;
