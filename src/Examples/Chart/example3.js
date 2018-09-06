import React, {Component} from 'react';
import Chart from "../../../components/common/Chart";

/**
 * This is an example Pie chart component.
 * Update series button is provided to update the chart
 
 */export default class ChartExample extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pieOptions: {
				chartTitle: 'Pie Chart ',
				dataPoints: {
					yCoordinates: [29.9, 71.5, 106.4, 129.2],
					seriesName: ['Jan', 'Feb', 'Mar', 'Apr'],
					colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7', '#FFE5AD']
				}
			}
		}
	}


	updateChartData = (originalConfig, newData) => {
		const dataPoints = { dataPoints: { ...originalConfig.dataPoints, ...newData } };
		return { ...originalConfig, ...dataPoints };
	};
	updatePieChart = () => {
		const coordinates = {
			yCoordinates: [45, 23, 84.4, 129.2, 23],
			dataLabel: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
			colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7', '#FFE5AD', '#ccc']
		};
		const pieOptions = this.updateChartData(this.state.pieOptions, coordinates);
		this.setState({ pieOptions });
	};
	postChartRender = chartType => {
		console.log('Chart Rendered: ', chartType);
	};

	render() {
		const { pieOptions, lineConfig } = this.state;
		return (
			<div style={{ width: '600px', margin: '0px auto' }}>
			

				<h2>Pie Chart</h2>
				<Chart type="pie" config={pieOptions} callback={this.postChartRender}/>
				<button onClick={this.updatePieChart}>Update Series</button>

				
			</div>
		);
	}
}
