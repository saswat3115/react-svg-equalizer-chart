import React, { useState } from 'react';

const VerticalBar = ({ length, startPoint, color, title }) => {
  const moveY = startPoint.y - length;
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

const Chart = ({ data, selected }) => {
  const [current, setCurrent] = useState(selected);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDiff, setDragDiff] = useState(0);

  const H = 240;
  const W = 240;
  const centerY = 120;
  const centerX = 120;
  const GAP = 20;
  const startPointX = centerX - current * GAP;

  const startDrag = (e) => {
    // if (succeeded) return;
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const onDrag = (e) => {
    if (isDragging) {
      if (e.touches && e.touches[0]) {
        // setThumbLeft(
        // 	Math.min(
        // 		Math.max(0, e.touches[0].clientX - startX),
        // 		container.width - thumb.width / 2
        // 	)
        // );
        const diff = startX - e.touches[0].clientX;
        setDragDiff(-diff);
      } else {
        const diff = startX - e.clientX;
        setDragDiff(-diff);
      }
    }
  };

  const dragEnd = () => {
    setIsDragging(false);
  };

  return (
    <svg
      height="100%"
      width="100%"
      viewBox={`0 0 ${H} ${W}`}
      onTouchStart={startDrag}
      onTouchMove={onDrag}
      onTouchEnd={dragEnd}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={dragEnd}
    >
      <g style={{ transform: `translateX(${dragDiff}px)` }}>
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
      </g>
      <VerticalCenterLine centerPoint={centerX - GAP} />
    </svg>
  );
};

export default Chart;
