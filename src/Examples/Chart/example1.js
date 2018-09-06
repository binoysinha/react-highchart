import React, { Component } from 'react';
import Chart from '../../../components/common/Chart';

const btnGrp = {
	display: 'flex',
	margin: '10px',
	justifyContent: 'space-around',
	width: '100%'
};

const btns = {
	border: '1px solid black',
	padding: '15px',
	fontSize: '12px',
	cursor: 'pointer'
};

/**
 * This is an example Line chart component.
 * This example shows how to define extra tooltip value to be rendered and tooltip manual configuration.
 * Update series button is provided to update the chart.
 * (NOTE) Update the chart immutably, without replacing any existing config. updateChartData is an example how to update the chart.
 
 */

export default class ChartExample extends Component {
	constructor(props) {
		super(props);
		/**
		 * Description of config
		 * 		-chartTitle: Defines the title of the chart(optional),
		 * 		-labels: Defines the label for xAxis and yAxis(optional),
		 * 			-yAxisVisible: If set to false, it will hide y axis data points.
		 * 		-dataPoints: Define the coordinates, color, name  for the chart data
		 * 			-yCoordinates: Point to be plotted along y axis(mandatory). It takes value in array format
		 * 				The length of the array defines the multiple datapoint we want to plot
		 * 			-xCoordinates: Point to be plotted along x axis(mandatory)
		 * 			-dataLabel: Name for the chart(optional)
		 * 			-color: Color to be represented for data points(optional)
		 * 			-shadowEnabled: Name of the series for which shadow need to be enabled(optional)
		 * 			-tooltipVal: Extra tooltip value to be shown along with the main yCoordinate data points.(optional)
		 * 				Each object in the array represnt value for the particular yCoordinate datapoint.
		 *
		 * Apart from this user defined config, User can provide other highcharts config. This extra will merge while plotting the charts.
		 *
		 */
		this.state = {
			lineConfig: {
				chartTitle: null,
				bgColor: '#F1F5FD',
				labels: {
					xAxis: null,
					yAxis: null,
					yAxisVisible: true
				},
				dataPoints: {
					yCoordinates: [
						[3.7, 3.3, 3.9, 5.1, 5.5, 3.8, 5.0, 9.0, 7.1, 3.7, 3.3, 6.2],
						[0.2, 0.1, 0.5, 0.6, 0.3, 0.2, 0.3, 0.5, 0.7, 0.3, 0.2, 0.2],
						[0.4, 0.5, 0.1, 0.6, 1.2, 0.9, 2.3, 3.5, 2.7, 4.3, 6.2, 1.2]
					],
					tooltipVal: [
						[{ Goa: 234, Punjab: 98, Orissa: 76 }, { Goa: 112, Punjab: 35, Orissa: 98 }, { Goa: 239, Orissa: 76 }],
						[
							{ Goa: 244, Punjab: 68, Orissa: 71 },
							{ Goa: 214, Punjab: 48, Orissa: 26 },
							{ Goa: 294, Punjab: 38, Orissa: 56 },
							{ Goa: 204, Punjab: 18, Orissa: 66 }
						],
						[]
					],
					shadowEnabled: 'Industry',
					xCoordinates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					seriesName: ['Industry', 'Manufacturing', 'Production'],
					showSeriesName: false,
					colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7']
				},
				/**
				 * User defined tooltip formatting.
				 */
				tooltip: {
					formatter: function() {
						let str = `<b>${this.point.name}: </b>${this.y}`;
						let tooltipObj = this.point.tootipVal;
						if (tooltipObj && typeof tooltipObj !== 'object') {
							throw new Error('Tooltip  value should be in object format');
						}

						for (let key in tooltipObj) {
							if (tooltipObj.hasOwnProperty(key)) {
								str += `<br/>${key}: ${tooltipObj[key] || ''}`;
							}
						}
						return str;
					}
				}
			},
			clickedPoint: {}
		};
	}
	/**
	 * Immutably update the chart
	 */
	updateChartData = (originalConfig, newData) => {
		const dataPoints = { dataPoints: { ...originalConfig.dataPoints, ...newData } };
		return { ...originalConfig, ...dataPoints };
	};

	updateLineConfig = () => {
		const coordinates = {
			yCoordinates: [[10, 14, 25], [9, 10, 21]],
			xCoordinates: ['2000', '2002', '2007']
		};
		const lineConfig = this.updateChartData(this.state.lineConfig, coordinates);

		this.setState({ lineConfig });
	};
	/**
	 * Function to select a particular series data
	 */

	selectSeries = series => {
		const enabledShadow = { shadowEnabled: series };
		const lineConfig = this.updateChartData(this.state.lineConfig, enabledShadow);
		this.setState({ lineConfig });
	};

	/**
	 * callback Function to called a once chart is renderd. It exposes a parameter for the type of chart rendered.
	 */
	postChartRender = chartType => {
		console.log('Chart Rendered: ', chartType);
	};
	/**
	 * Function to be called upon clicking a particular point in the series
	 */
	seriesClickHandler = clickedPoint => {
		this.setState({ clickedPoint });
	};

	render() {
		const { lineConfig, clickedPoint } = this.state;
		return (
			<div style={{ width: '600px', margin: '0px auto' }}>
				<h2>Linecharts</h2>
				<Chart
					type="spline"
					config={lineConfig}
					className="line-chart"
					seriesClicked={this.seriesClickHandler}
					callback={this.postChartRender}
				/>
				<button onClick={this.updateLineConfig}>Update Series</button>
				<div style={btnGrp}>
					<div style={btns} onClick={this.selectSeries.bind(null, 'Industry')}>
						Select Industry Series
					</div>
					<div style={btns} onClick={this.selectSeries.bind(null, 'Manufacturing')}>
						Select Manufacturing Series
					</div>
					<div style={btns} onClick={this.selectSeries.bind(null, 'Production')}>
						Select Production Series
					</div>
				</div>
				{clickedPoint.name ? (
					<p>
						Series Name: {clickedPoint.name}
						<br /> Point Clicked: {clickedPoint.point}
					</p>
				) : null}
			</div>
		);
	}
}
