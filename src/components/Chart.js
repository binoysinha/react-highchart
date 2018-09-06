/**
 * React highchart wrapper
 *
 * @version 1.0.0
 * @author [Binoy Sinha](https://github.com/binoy-sinha)
 */
import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';

import { COLOR_MAP, defaultChartConfig } from './ChartHelper/helper';
import ChartWrapper from './ChartHelper/ChartWrapper';

const shadowObj = {
	offsetX: 0,
	offsetY: 7,
	width: 6,
	opacity: 0.03
};

/**
 * This is React functional component that wraps HighChart library.
 * Chart component takes user defined props for rendering chart.
 * This component acts as middle layer for merging user config and default config before rendering Highcharts with updated config.
 * The benefit of this approach is user does not have to call extra function to re-render the chart when x,y coordinates changes.
 * (NOTE) User can pass own config as defined or directly pass highcharts config as props. Extra config beyond the props will be merged before rendering the chart.
 * See the props section for user defined config.
 */

const Chart = ({ type, config, className = 'chart-wrapper', callback = () => {}, seriesClicked = () => {} }) => {
	let { chartTitle = null, dataPoints, bgColor, labels = { xAxis: null, yAxis: null }, ...extraConfig } = config;

	if (!type) {
		throw new Error('Chart type must be specified');
	}

	if (!dataPoints.yCoordinates) {
		throw new Error('Chart coordinates must be specified for the ' + type + ' chart component');
	}

	const chartTypes = {
		chart: {
			type,
			backgroundColor: bgColor || '#F1F5FD'
		}
	};
	let seriesData = { series: [] }; //series will take yCoordinates as an Array or Array of array

	let title = { title: { text: chartTitle } }; // Sets the chart title
	/**
	 * Get the X,Y  data label.
	 * labels.yAxis: Display Y axis label
	 * labels.xAxis: Display X axis label
	 */
	let coordLabel = {
		yAxis: { title: { text: labels.yAxis }, visible: labels.yAxisVisible },
		xAxis: { title: { text: labels.xAxis } }
	};

	/**
	 * Merge user config with highcharts default config.
	 * This is used to ensure that any extra config for xAxis gets merged with the user provided config
	 * extraConfig.xAxis: Highchart xAxis key config
	 * coordLabel.xAxis: User xAxis config
	 */
	if (extraConfig.xAxis) {
		let xAxis = { ...extraConfig.xAxis, ...coordLabel.xAxis };
		extraConfig = { ...extraConfig, ...xAxis };
	}

	/**
	 * Merge user config with highcharts default config.
	 * This is used to ensure that any extra config for xAxis gets merged with the user provided config
	 * extraConfig.yAxis: Highchart yAxis key config
	 * coordLabel.yAxis: User yAxis config
	 */
	if (extraConfig.yAxis) {
		let yAxis = { ...extraConfig.yAxis, ...coordLabel.yAxis };
		extraConfig = { ...extraConfig, ...yAxis };
	}

	/**
	 * Highchart takes xCoordinates as a categories prop for mapping points along x axis
	 * Setting xCoordinates as a property of xAxis
	 */
	if (dataPoints.xCoordinates) {
		let xDataPoints = {
			xAxis: { categories: dataPoints.xCoordinates }
		};
		let xAxis = { ...extraConfig.xAxis, ...xDataPoints };
		extraConfig = { ...extraConfig, ...xAxis };
	}

	let xAxisConfig = { xAxis: { ...defaultChartConfig.xAxis, ...coordLabel.xAxis, ...extraConfig.xAxis } };
	let yAxisConfig = { yAxis: { ...defaultChartConfig.yAxis, ...coordLabel.yAxis, ...extraConfig.yAxis } };
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
				name: dataPoints.seriesName ? dataPoints.seriesName[idx] : null,
				y: item,
				color: dataPoints.colors ? dataPoints.colors[idx] : COLOR_MAP[idx]
			};
			pieData.push(obj);
		});

		seriesData.series = [{ data: pieData }];
	} else {
		seriesData.series = dataPoints.yCoordinates.map((points, idx) => {
			let ptPoints = [];
			try {
				ptPoints = points.map((item, j) => {
					/**
					 * Tooltip value must be provided in array ofObject format
					 * e.g: [{Industry: 2345}, {Manufacturing: 434}]
					 */
					if (dataPoints.tooltipVal && dataPoints.tooltipVal.length > 0) {
						if (dataPoints.tooltipVal[idx][j] && typeof dataPoints.tooltipVal[idx][j] !== 'object') {
							throw new Error(`Tooltip object must have object format`);
						}
					}
					return {
						name: dataPoints.seriesName ? dataPoints.seriesName[idx] : '',
						y: item,
						tootipVal: dataPoints.tooltipVal && dataPoints.tooltipVal.length > 0 ? dataPoints.tooltipVal[idx][j] : '',
						clickedFunc: seriesClicked
					};
				});
			} catch (e) {
				throw new Error(e);
			}
			let seriesData = {
				name: dataPoints.seriesName ? dataPoints.seriesName[idx] : '',
				data: ptPoints,
				color: dataPoints.colors ? dataPoints.colors[idx] : COLOR_MAP[idx],
				shadow: false,
				showInLegend: dataPoints.showSeriesName
			};

			if (dataPoints.shadowEnabled && dataPoints.shadowEnabled === dataPoints.seriesName[idx]) {
				seriesData.shadow = shadowObj;
			}

			return seriesData;
		});
	}

	/**
	 * Merging the user-defined config with the deafult config
	 */
	const configProps = {
		...defaultChartConfig,
		...chartTypes,
		...title,
		...seriesData,
		...extraConfig,
		...xAxisConfig,
		...yAxisConfig
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
			yCoordinates: '',
			yCoordinates: ''
		},
		title: null
	}
};

Chart.propTypes = {
	/**
	 * Config object consist of following properties
	 * chartTitle: Title of the chart;
	 * bgColor: Background color for the chart;
	 * dataPoints: Coordinates for the chart plotting, color.
	 * labels: X,Y coordinates Info
	 */
	config: PropTypes.shape({
		chartTitle: PropTypes.string,
		bgColor: PropTypes.string,
		dataPoints: PropTypes.shape({
			yCoordinates: PropTypes.array,
			xCoordinates: PropTypes.array,
			tooltipVal: PropTypes.array,
			dataLabel: PropTypes.array,
			colors: PropTypes.array,
			shadowEnabled: PropTypes.string
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
	 * This props provide the hook to give class to the wrapping chart container
	 */
	className: PropTypes.string,
	/**
	 * Callback function to be executed once chart is rendered
	 */
	callback: PropTypes.func,
	/**
	 * Function to be executed once user clicked on a particular series.
	 */
	seriesClicked: PropTypes.func
};
export default Chart;
