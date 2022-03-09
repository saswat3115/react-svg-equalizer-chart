import React from 'react';
import './style.css';
import Chart from './Chart';
import LineChart from './LineChart';

const data = {
  1: { title: 'M', amount: 40, color: '#F8C630' },
  2: { title: 'T', amount: 50, color: 'rgba(255, 0, 0, 0.25)' },
  3: { title: 'W', amount: 30, color: '#F8C630' },
  4: { title: 'T', amount: -40, color: 'rgba(0, 156, 91, 0.25)' },
  5: { title: 'F', amount: -20, color: '#F8C630' },
  6: { title: 'S', amount: 70, color: 'rgba(255, 0, 0, 0.25)' },
  7: { title: 'S', amount: 30, color: 'rgba(0, 156, 91, 0.25)' },
  8: { title: 'M', amount: 40, color: '#F8C630' },
  9: { title: 'T', amount: 50, color: 'rgba(255, 0, 0, 0.25)' },
  10: { title: 'W', amount: 30, color: '#F8C630' },
  11: { title: 'T', amount: -40, color: 'rgba(0, 156, 91, 0.25)' },
};

export default function App() {
  return (
    <div className="chart">
      {/* <Chart data={data} selected={6} /> */}
      <LineChart />
    </div>
  );
}
