import React from 'react';
import './style.css';
import Chart from './Chart';

const data = {
  mon: { title: 'M', amount: 40, color: '#F8C630' },
  tue: { title: 'T', amount: 50, color: 'rgba(255, 0, 0, 0.25)' },
  wed: { title: 'W', amount: 30, color: '#F8C630' },
  thu: { title: 'T', amount: -40, color: 'rgba(0, 156, 91, 0.25)' },
  fri: { title: 'F', amount: -20, color: '#F8C630' },
  sat: { title: 'S', amount: 70, color: 'rgba(255, 0, 0, 0.25)' },
  sun: { title: 'S', amount: 30, color: 'rgba(0, 156, 91, 0.25)' },
};

export default function App() {
  return (
    <div className="chart">
      <Chart data={data} />
    </div>
  );
}
