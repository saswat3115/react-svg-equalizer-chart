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

const Chart = ({ data }) => {
  const H = 240;
  const W = 240;
  const centerY = 120;
  const GAP = 20;
  const startPointX = 20;

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
    </svg>
  );
};

export default Chart;
