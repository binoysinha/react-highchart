import React from 'react';

const updateChartData = (originalConfig, newData) => {
	const dataPoints = { dataPoints: { ...originalConfig.dataPoints, ...newData } };
	return { ...originalConfig, ...dataPoints };
};

import Chart from './components/Chart';

const areaConfig = {
	chartTitle: 'US and USSR nuclear stockpiles',
	labels: {
		xAxis: 'USA vs USSR',
		yAxis: 'Nuclear weapon states'
	},
	dataPoints: {
		yCoordinates: [
			[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
			[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
		],
		xCoordinates: ['1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010'],
		dataLabel: ['USA', 'USSR'],
		colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7']
	}
};

const columnOptions = {
	chartTitle: 'Column Chart ',
	dataPoints: {
		yCoordinates: [29.9, 71.5, 106.4, 129.2],
		xCoordinates: ['Jan', 'Feb', 'Mar', 'Apr'],
		dataLabel: ['Jan', 'Feb', 'Mar', 'Apr'],
		colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7', '#FFE5AD']
	}
};

// Render app with demo chart
export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pieOptions: {
				chartTitle: 'Pie Chart ',
				dataPoints: {
					yCoordinates: [29.9, 71.5, 106.4, 129.2],
					dataLabel: ['Jan', 'Feb', 'Mar', 'Apr'],
					colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7', '#FFE5AD']
				}
			},
			lineConfig: {
				chartTitle: 'Solar Employment Growth by Sector, 2010-2016',
				labels: {
					xAxis: '',
					yAxis: 'Number of Employees'
				},
				dataPoints: {
					yCoordinates: [
						[43934, 52503, 57177, 69658, 97031],
						[24916, 24064, 29742, 29851, 32490],
						[12908, 5948, 8105, 11248, 8989]
					],
					xCoordinates: ['1940', '1950', '1960', '1970', '1980'],
					dataLabel: ['Industry', 'Manufacturing', 'Production'],
					colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7']
				}
			},
			reRender: false
		};
	}

	updateLineConfig = () => {
		const coordinates = {
			yCoordinates: [[10, 14, 25], [9, 10, 21]],
			xCoordinates: ['2000', '2002', '2007']
		};
		const lineConfig = updateChartData(this.state.lineConfig, coordinates);

		this.setState({ lineConfig });
	};

	updatePieChart = () => {
		const coordinates = {
			yCoordinates: [45, 23, 84.4, 129.2, 23],
			dataLabel: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
			colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7', '#FFE5AD', '#ccc']
		};
		const pieOptions = updateChartData(this.state.pieOptions, coordinates);
		this.setState({ pieOptions });
	};
	postChartRender = chartType => {
		console.log('Chart Rendered: ', chartType);
	};

	render() {
		const { pieOptions, lineConfig } = this.state;
		return (
			<div style={{ width: '600px', margin: '0px auto' }}>
				<h2>Linecharts</h2>
				<Chart type="line" config={lineConfig} className="line-chart" callback={this.postChartRender} />

				<button onClick={this.updateLineConfig}>Update Series</button>

				<h2>Area Chart</h2>
				<Chart type="area" config={areaConfig} />

				<h2>Pie Chart</h2>
				<Chart type="pie" config={pieOptions} />
				<button onClick={this.updatePieChart}>Update Series</button>

				<h2>Column Chart</h2>
				<Chart type="column" config={columnOptions} />
			</div>
		);
	}
}
