import React, { Component } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { getChartConfig } from '../../Services/ChartService';
import Loading from './Loading';

ChartJS.register(ArcElement, Tooltip, Legend);


export default class DoughnutChart extends Component {
  graph = (<Loading className="margin-center"/>);

  

  render = () => {
    if (this.props.data !== null) {
      const [data, options] = getChartConfig('doughnut', this.props.data)
      this.graph = (<Doughnut data={data} options={options} />)
    }

    return (
      <div className={`widget ${this.props.className}`}>
        <div className="widget__title">
          {this.props.title}
        </div>
        <div className="widget__chart">
          {this.graph}
        </div>
      </div>
    )
  }
}
