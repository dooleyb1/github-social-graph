import React, { Component } from 'react';
import '../css/CommitGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis} from 'react-vis';

const CustomAxisLabel = (props/*: {
    title: string,
    xAxis: boolean,
    // note these next two are passed down from the parent XYPlot/Flexible*XYPlot
    innerWidth: number,
    innerHeight: number
}*/) => {
    // since we rotate the y label, we have to adjust it to center
   // (ideally we'd rotate about the correct origin, but i couldn't get that working)
    const yLabelOffset = {
        y: props.innerHeight / 2 + props.title.length * 3, // '3' might be different for you depending on your font size/char width
        x: 10
    };

    const xLabelOffset = {
        x: (props.innerWidth / 2) + 30,
        y: 1.5 * props.innerHeight // 1.2 was enough for me to get it below x axis. you may need a diff't #
    };
    const transform = props.xAxis
        ? `translate(${xLabelOffset.x}, ${xLabelOffset.y})`
        : `translate(${yLabelOffset.x}, ${yLabelOffset.y}) rotate(-90)`;

    return (
        <g
            transform={transform}
        >
            <text style={{color: '#4DD0E1'}}>{props.title}</text>
        </g>
    );
};

CustomAxisLabel.displayName = 'CustomAxisLabel';
CustomAxisLabel.requiresSVG = true;

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
            <CustomAxisLabel title={'Commits'}/>
            <CustomAxisLabel title={'Date'} xAxis />
            <LineSeries data={this.props.graphData} />
            </XYPlot>
          </div>
        )
      }
  }
}

export default CommitGraph;
