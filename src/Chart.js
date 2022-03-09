import React, { useState } from 'react';

const VerticalBar = ({ length, startPoint, color, title, selected }) => {
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
        className={selected ? 'selected' : ''}
      />
      <circle cx={startPoint.x} cy={startPoint.y} r={4} fill="white" />
      <text x={startPoint.x - 2} y={startPoint.y + 2} fontSize={5}>
        {title}
      </text>
    </g>
  );
};

const CrosshairLine = ({ centerPoint }) => {
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

const Axis = ({ x, centerY, data, bgX }) => {
  const GAP = 20;
  const startPointY = centerY - data.indexOf(0) * GAP;

  return (
    <g>
      <rect
        className="axis-bg"
        x={bgX}
        y={startPointY}
        height={data.length * GAP}
        width={20}
      />
      <g zIndex="2">
        {data.map((item, i) => (
          <text
            key={item}
            x={x}
            y={startPointY + i * GAP}
            fontSize={7}
            fill="gray"
          >
            {item}
          </text>
        ))}
      </g>
    </g>
  );
};

const H = 260;
const W = 260;
const centerY = H / 2;
const centerX = W / 2;
const GAP = 20;

const Chart = ({ data, selected }) => {
  const [current, setCurrent] = useState(selected);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDiff, setDragDiff] = useState(0);

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
        const diff = startX - e.touches[0].clientX;
        if (-101 < diff && diff < 101) {
          setDragDiff(-diff);
        }
      } else {
        const diff = startX - e.clientX;
        if (-101 < diff && diff < 101) {
          setDragDiff(-diff);
        }
      }
    }
  };

  const dragEnd = () => {
    setIsDragging(false);
    const mod = dragDiff > 0 ? dragDiff : -1 * dragDiff;
    let noOfBarMoved = Math.floor(mod / GAP);
    const nearBarFragment = mod % GAP;
    if (nearBarFragment > 10) {
      noOfBarMoved = noOfBarMoved + 1;
    }
    if (dragDiff > 0) {
      setCurrent(current - noOfBarMoved < 1 ? 1 : current - noOfBarMoved);
      setDragDiff(0);
    } else {
      setCurrent(
        current + noOfBarMoved > Object.keys(data).length
          ? Object.keys(data).length
          : current + noOfBarMoved
      );
      setDragDiff(0);
    }
  };

  return (
    <svg
      // height="240"
      // width="240"
      viewBox={`0 0 ${H} ${W}`}
      onTouchStart={startDrag}
      onTouchMove={onDrag}
      onTouchEnd={dragEnd}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={dragEnd}
    >
      <g
        style={{
          transform: `translateX(${dragDiff}px)`,
          transition: 'all',
        }}
      >
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
              selected={item == current}
            />
          );
        })}
      </g>
      <CrosshairLine centerPoint={centerX - GAP} />
      <Axis centerY={centerY} x={4} data={[1.5, 1, 0.5, 0, 0.5, 1]} bgX={0} />
      <Axis
        centerY={centerY}
        x={244}
        data={[150, 100, 50, 0, 50, 100]}
        bgX={W - 20}
      />
    </svg>
  );
};

export default Chart;
