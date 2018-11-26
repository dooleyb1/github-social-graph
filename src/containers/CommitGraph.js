import React, { Component } from 'react';
import '../css/CommitGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, ChartLabel, XAxis, YAxis, Hint} from 'react-vis';

class CommitGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      event: null
    };
  }

  render () {

      if(!this.props.graphData){
        return(<div></div>)
      } else{
        const {value} = this.state;
        console.log(this.state.event)
        return (
          <div className='chart'>
            <XYPlot
              margin={{left: 50,bottom: 100}}
              xType="time"
              height={300}
              width= {500}
              onMouseLeave={() => this.setState({value: null})}
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
              }}
              />
            <LineSeries
              onNearestXY={(datapoint, event) => this.setState({
                value: {
                  date: datapoint.x.toString().substring(0,15),
                  commits: datapoint.y,
                },
                event: event
              })}
              data={this.props.graphData}
            />
            {this.state.value && <Hint
              value={this.state.value}
              align={{horizontal: 'right', vertical: 'top'}}
            />}
            </XYPlot>
          </div>
        )
      }
  }
}

export default CommitGraph;
