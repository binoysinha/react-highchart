/**
 * React highchart wrapper
 *
 * @version 1.0.0
 * @author [Binoy Sinha](https://github.corp.inmobi.com/binoy-sinha)
 */
import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';

import { COLOR_MAP, defaultChartConfig } from '../chartHelper';
import ChartWrapper from '../ChartWrapper';

/**
 * This is an react functional component that exposes Chart component to user
 */

const Chart = ({ type, config, className = 'chart-wrapper', callback = () => {} }) => {
	let { chartTitle = null, dataPoints, labels = { xAxis: null, yAxis: null }, ...extraConfig } = config;

	if (!type) {
		throw new Error('Chart type must be specified');
	}
	if (!dataPoints.yCoordinates) {
		throw new Error('Chart coordinates must be specified for the ' + type + ' chart component');
	}

	const chartTypes = {
		chart: {
			type
		}
	};
	let seriesData = { series: [] }; //series will take yCoordinates as an Array or Array of array

	let title = { title: { text: chartTitle } }; // Sets the chart title

	/**
	 * Get the X,Y  data label.
	 * labels.yAxis: Display Y axis label
	 * labels.xAxis: Display X axis label
	 */
	let coordLabel = { yAxis: { title: { text: labels.yAxis } }, xAxis: { title: { text: labels.xAxis } } };

	/**
	 * Merge user config with highcharts default config.
	 * This is used to ensure that any extra config for xAxis gets merged with the user provided config
	 * extraConfig.xAxis: Highchart xAxis key config
	 * coordLabel.xAxis: User xAxis config
	 */
	if (extraConfig.xAxis) {
		extraConfig = { ...extraConfig.xAxis, ...coordLabel.xAxis };
	}

	/**
	 * Merge user config with highcharts default config.
	 * This is used to ensure that any extra config for xAxis gets merged with the user provided config
	 * extraConfig.yAxis: Highchart yAxis key config
	 * coordLabel.yAxis: User yAxis config
	 */
	if (extraConfig.yAxis) {
		extraConfig = { ...extraConfig.yAxis, ...coordLabel.yAxis };
	}

	/**
	 * Highchart takes xCoordinates as a categories prop for mapping points along x axis
	 * Setting xCoordinates as a property of xAxis
	 */
	if (dataPoints.xCoordinates) {
		let xDataPoints = {
			xAxis: { categories: dataPoints.xCoordinates }
		};
		extraConfig = { ...extraConfig.xAxis, ...xDataPoints };
	}

	/**
	 * Populate the series data with the coordinates point depending on chart type
	 * Series data will take an array of object
	 * Object will have three keys
	 * 		-name: Name of the point of what it represent,
	 * 		-y: yCoordinate,
	 * 		-color:Define the color for the chart data
	 */
	if (type === 'pie' || type === 'column') {
		const pieData = [];
		dataPoints.yCoordinates.forEach((item, idx) => {
			const obj = {
				name: dataPoints.dataLabel ? dataPoints.dataLabel[idx] : '',
				y: item,
				color: dataPoints.colors ? dataPoints.colors[idx] : COLOR_MAP[idx]
			};
			pieData.push(obj);
		});

		seriesData.series = [{ data: pieData }];
	} else {
		seriesData.series = dataPoints.yCoordinates.map((points, idx) => {
			const ptPoints = points.map(item => ({
				name: dataPoints.dataLabel ? dataPoints.dataLabel[idx] : '',
				y: item,
				color: dataPoints.colors ? dataPoints.colors[idx] : COLOR_MAP[idx]
			}));
			return {
				name: dataPoints.dataLabel ? dataPoints.dataLabel[idx] : '',
				data: ptPoints
			};
		});
	}

	/**
	 * Merging the user-defined config with the deafult config
	 */
	const configProps = {
		...defaultChartConfig,
		...chartTypes,
		...title,
		...coordLabel,
		...seriesData,
		...extraConfig
	};
	return (
		<ChartWrapper
			highcharts={Highcharts}
			constructorType={'chart'}
			config={configProps}
			containerProps={{ className }}
			callback={callback}
		/>
	);
};

Chart.defaultProps = {
	config: {
		labels: {
			xAxis: '',
			yAxis: ''
		},
		title: null
	}
};

Chart.propTypes = {
	/**
	 * chartTitle: Title of the chart
	 * dataPoints: Coordinates for the chart plotting, color.
	 * labels: X,Y coordinates Info
	 */
	config: PropTypes.shape({
		chartTitle: PropTypes.string,
		dataPoints: PropTypes.shape({
			yCoordinates: PropTypes.array,
			xCoordinates: PropTypes.array,
			dataLabel: PropTypes.array,
			colors: PropTypes.array
		}).isRequired,
		labels: PropTypes.shape({
			xAxis: PropTypes.string,
			yAxis: PropTypes.string
		})
	}),
	/**
	 * type: Type of the chart e.g pie, line, area etc
	 */
	type: PropTypes.string.isRequired,
	/**
	 * className: Give the className to the chart div container
	 */
	className: PropTypes.string,
	/**
	 * callback: Callback function to be executed once chart is rendered
	 */
	callback: PropTypes.func
};
export default Chart;
