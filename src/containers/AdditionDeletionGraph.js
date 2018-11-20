import React, { Component } from 'react';
import '../css/AdditionDeletionGraph.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalBarSeries} from 'react-vis';

class AdditionDeletionGraph extends Component {

  constructor (props) {
    super(props);

    console.log(props.additionStats)
    //console.log(props.deletionStats)
  }

  render () {
      if(!this.props.additionStats || !this.props.deletionStats){
        return(<div></div>)
      } else{
        return (
          <div className='chart'>
            <XYPlot
              margin={{left: 50,bottom: 100}}
              xType="time"
              yType="linear"
              height={300}
              width= {500}
              stackBy="y"
            >
            <XAxis tickLabelAngle={-90} />
            <YAxis/>
            <VerticalBarSeries data={this.props.additionStats}/>
            <VerticalBarSeries data={this.props.deletionStats}/>
            </XYPlot>
          </div>
        )
      }
  }
}

export default AdditionDeletionGraph;
