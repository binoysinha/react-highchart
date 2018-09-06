import React, { Component } from 'react';
import Chart from '../../../components/common/Chart';



/**
 * This is an example Area chart component.
 * Update series button is provided to update the chart
 
 */
export default class ChartExample extends Component {
	constructor(props) {
		super(props);
		/**
		 * Description of config
		 * 		-chartTitle: Defines the title of the chart,
		 * 		-labels: Defines the label for xAxis and yAxis,
		 * 		-dataPoints: Define the coordinates, color, name  for the chart data
		 * 			-yCoordinates: Point to be plotted along y axis(mandatory). It takes value in array format
		 * 				The length of the array defines the multiple datapoint we want to plot
		 * 			-xCoordinates: Point to be plotted along x axis(mandatory)
		 * 			-dataLabel: Name for the chart(optional)
		 * 			-color: Color to be represented for data points
		 *
		 * Apart from this user defined config, User can provide other highcharts config. This extra will merge while plotting the charts.
		 *
		 */
		this.state = {
			areaConfig: {
				chartTitle: 'Budget vs User Reach',
				labels: {
					xAxis: 'Max User Reach',
					yAxis: 'Budget'
				},
				dataPoints: {
					yCoordinates: [[30, 14, 20, 43, 57, 71]],
					xCoordinates: [11000, 6440, 12879, 19319, 25758, 32198],
					colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7'],
					showSeriesName: false
				}
			}
		};
	}
	updateChartData = (originalConfig, newData) => {
		const dataPoints = { dataPoints: { ...originalConfig.dataPoints, ...newData } };
		return { ...originalConfig, ...dataPoints };
	};
	/**
	 * This function updates the datapoints and rerender the chart
	 * Setting xCoordinates as a property of xAxis
	 * updateChartData is a helper function to update the datapoints immutabely
	 */
	updateAreaConfig = () => {
		const coordinates = {
			yCoordinates: [[57177, 69658, 97031], [32490, 30282, 38121]],
			xCoordinates: ['2000', '2002', '2007']
		};
		const areaConfig = this.updateChartData(this.state.areaConfig, coordinates);

		this.setState({ areaConfig });
	};

	/**
	 * Callback function to be executed once chart is rendered
	 */
	postChartRender = chartType => {
		console.log('Chart Rendered: ', chartType);
	};

	render() {
		const { areaConfig } = this.state;
		return (
			<div style={{ width: '600px', margin: '0px auto' }}>
				<h2>Area Chart</h2>
				<Chart type="areaspline" config={areaConfig} className="area-chart" callback={this.postChartRender} />
				<button onClick={this.updateAreaConfig}>Update Series</button>
			</div>
		);
	}
}
