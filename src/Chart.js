import React from 'react';

const VerticalBar = ({ length, startPoint, color, title }) => {
  const moveY = startPoint.y - length;
  console.log(moveY, startPoint.y, length);
  return (
    <g>
      <path
        d={`M${startPoint.x} ${startPoint.y} L${startPoint.x} ${moveY} Z`}
        strokeWidth={10}
        stroke={color}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={startPoint.x} cy={startPoint.y} r={4} fill="white" />
      <text x={startPoint.x - 2} y={startPoint.y + 2} fontSize={5}>
        {title}
      </text>
    </g>
  );
};

const VerticalCenterLine = ({ centerPoint }) => {
  return (
    <g>
      <line
        x1={centerPoint}
        y1={20}
        x2={centerPoint}
        y2={220}
        stroke="rgba(20, 45, 54, .3)"
        strokeDasharray={2}
      />
      <circle cx={centerPoint} cy={220} r={2} fill={`rgba(20, 45, 54, .5)`} />
    </g>
  );
};

// const Axis = ({ x, }) => {

// }

const Chart = ({ data }) => {
  const H = 240;
  const W = 240;
  const centerY = 120;
  const centerX = 120;
  const GAP = 20;
  const startPointX = centerX - (Object.keys(data).length / 2) * GAP;

  return (
    <svg height="100%" width="100%" viewBox={`0 0 ${H} ${W}`}>
      {Object.keys(data).map((item, i) => {
        const { color, title, amount } = data[item];
        return (
          <VerticalBar
            key={item}
            color={color}
            length={amount}
            title={title}
            startPoint={{
              x: startPointX + i * GAP,
              y: centerY,
            }}
          />
        );
      })}
      <VerticalCenterLine centerPoint={centerX - GAP / 2} />
    </svg>
  );
};

export default Chart;
