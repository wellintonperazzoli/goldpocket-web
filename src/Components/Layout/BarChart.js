import React, { Component } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getChartConfig } from '../../Services/ChartService';
import Loading from './Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default class BarChart extends Component {
  graph = (<Loading className="margin-center"/>);

  render = () => {
    if (this.props.data !== null) {
      const [data, options] = getChartConfig('bar', this.props.data)
      this.graph = (<Bar data={data} options={options} />)
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
