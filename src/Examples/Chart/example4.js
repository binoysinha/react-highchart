import React, {Component} from 'react';
import Chart from "../../../components/common/Chart";

/**
 * This is an example Column chart component.
 * Update series button is provided to update the chart
 
 */export default class ChartExample extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columnOptions: {
				chartTitle: 'Column Chart ',
				dataPoints: {
					yCoordinates: [29.9, 71.5, 106.4, 129.2],
					xCoordinates: ['Jan', 'Feb', 'Mar', 'Apr'],
					seriesName: ['Jan', 'Feb', 'Mar', 'Apr'],
					showSeriesName: false,
					colors: ['#AFCAFD', '#E2E9F8', '#A3AFC7', '#FFE5AD']
				}
			}
		
		};
	}

	
	postChartRender = chartType => {
		console.log('Chart Rendered: ', chartType);
	};

	render() {
		const { columnOptions } = this.state;
		return (
			<div style={{ width: '600px', margin: '0px auto' }}>
			

				<h2>Column Chart</h2>
				<Chart type="column" config={columnOptions} callback={this.postChartRender}/>
			</div>
		);
	}
}
