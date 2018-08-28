export const defaultChartConfig = {
	title: {
		text: null
	},
	yAxis: {
		title: {
			text: null
		}
	},
	credits: {
		enabled: false
	},
	plotOptions: {
		series: {
			allowPointSelect: true
		}
	},

	tooltip: {
		formatter: function() {
			return '<b>' + this.point.name + '</b>: ' + this.y + '';
		}
	},
	series: []
};

export const COLOR_MAP = [
	'#a1daf7',
	'#d5a1f7',
	'#a6c1f7',
	'#afa1f7',
	'#f7aac4',
	'#f7c7a6',
	'#f7eca1',
	'#f2a1f7',
	'#adf7ea',
	'#aef4ae',
	'#ffb6da',
	'#ffddb0',
	'#d6f4ab',
	'#f4a8a8',
	'#f4dfb5',
	'#ceb5f4',
	'#e5d3bd',
	'#b9edc6',
	'#ced8ea',
	'#c4d2f2'
];
