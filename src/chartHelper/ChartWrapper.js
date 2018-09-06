/**
 * React highchart wrapper
 *
 * @version 1.0.0
 * @author [Binoy Sinha](https://github.com/binoy-sinha)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This is an react component that wraps Highchart library
 *
 */
class ChartWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const props = this.props;
		const highcharts = props.highcharts || win.Highcharts;
		const constructorType = props.constructorType || 'chart';
		const chartType = props.config.chart.type;
		// Intialise and Create chart
		this.chart = new highcharts[constructorType](
			this.container,
			Object.assign({}, props.config),
			props.callback(chartType)
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const update = this.props.update;
		// Update if not specified or set to true
		return typeof update === 'undefined' || update;
	}

	componentDidUpdate() {
		this.chart.update(Object.assign({}, this.props.config), true, !(this.props.oneToOne === false));
	}

	componentWillReceiveProps() { //eslint-disable-line
		this.chart.update(Object.assign({}, this.props.config), true, !(this.props.oneToOne === false));
	}

	componentWillUnmount() {
		// Destroy chart
		this.chart.destroy();
	}
	render() {
		const containerProps = this.props.containerProps || {};

		// Add ref to div props
		containerProps.ref = container => {
			this.container = container;
		};

		// Create container for our chart
		return React.createElement('div', containerProps);
	}
}
ChartWrapper.defaultProps = {
	callback: () => {},
	constructorType: 'chart'
};
ChartWrapper.propTypes = {
	/**
	 * containerProps: Object Config for Chart wrapper e.g className
	 */
	containerProps: PropTypes.shape({}),
	/**
	 * config: A configuration object for the new chart options.
	 */
	config: PropTypes.shape({}),
	/**
	 * update: If true will update the chart
	 */
	update: PropTypes.bool,
	/**
	 * When true, the series, xAxis and yAxis collections
	 *  will be updated one to one, and items will be either added
	 * or removed to match the new updated options.
	 */
	oneToOne: PropTypes.bool,
	/**
	 * constructorType: Defines the constructor type of Highcharts
	 */
	constructorType: PropTypes.string,
	/**
	 * callback: Callback function to be executed once chart is rendered
	 */
	callback: PropTypes.func
};
export default ChartWrapper;
