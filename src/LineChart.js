import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { format } from 'date-fns';
import { uniq } from 'lodash';

const data = [
  { d: '2019-01-01', v: 1000 },
  { d: '2019-02-01', v: 2000 },
  { d: '2019-03-01', v: 1500 },
  { d: '2019-04-01', v: 1200 },

  { d: '2020-01-01', v: 1000 },
  { d: '2020-02-01', v: 1300 },
  { d: '2020-03-01', v: 1500 },
  { d: '2020-04-01', v: 2200 },

  { d: '2021-01-01', v: 3000 },
  { d: '2021-02-01', v: 3400 },
  { d: '2021-03-01', v: 5000 },
  { d: '2021-04-01', v: 4000 },
];

const years = uniq(data.map((item) => new Date(item.d).getFullYear()));
console.log(years);

const option = {
  chart: {
    height: '200px',
    useBox: true,
    borderWidth: 0,
    margin: [10, 0, 30, 0],
  },
  credits: {
    enabled: false,
  },
  title: {
    text: '',
  },
  xAxis: {
    type: 'category',
    categories: years, // uniq(data.map((item) => new Date(item.d).getFullYear())),
    title: {
      text: '',
    },
    // uniqueNames: true,
    // labels: {
    // 	formatter: (item: any) => {
    // 		const [dd, MMM, yyyy] = format(item.value, 'dd MMM yyyy').split(' ');
    // 		// return format(item.value, "yyyy");
    // 		if (MMM == 'Jan') return yyyy;
    // 		return '';
    // 	},
    // },
    width: '100%',
    gridLineWidth: 0,
    lineColor: 'transparent',
    // tickInterval: Math.ceil(data.length / 6),
    showLastLabel: false,
    showFirstLabel: false,
  },
  yAxis: {
    visible: false,
    title: {
      text: '',
    },
    gridLineWidth: 0,
  },
  plotOptions: {
    series: {
      color: 'red',
      pointPlacement: 'on',
    },
    areaspline: {
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, 'red'],
          [1, 'white'],
        ],
      },
    },
    marker: {
      enabled: false,
      color: 'transparent',
      lineWidth: 1,
      radius: 0,
    },
  },
  series: [
    {
      data: [...data.map((item) => item.v)],
      type: 'areaspline',
      marker: {
        fillColor: 'transparent',
        radius: 0,
        lineWidth: 1,
        lineColor: null, // inherit from series
      },
      showInLegend: false,
    },
  ],
};

const LineChart = () => {
  return <HighchartsReact highcharts={Highcharts} options={option} />;
};

export default LineChart;
