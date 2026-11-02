import React from 'react';

interface RadarChartProps {
  accords: Record<string, number>;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ accords, size = 260 }) => {
  const entries = Object.entries(accords);
  if (entries.length < 3) return null;

  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (Math.PI * 2) / entries.length;

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1];

  // Coordinates for the data points
  const points = entries.map(([_, value], i) => {
    const r = (Math.min(100, Math.max(0, value)) / 100) * radius;
    const angle = i * angleStep - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, value };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="floralRadarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#F472B6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Concentric grid circles */}
        {levels.map((lvl, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={radius * lvl}
            fill="none"
            stroke="rgba(139, 92, 246, 0.15)"
            strokeDasharray={lvl === 1 ? 'none' : '3,3'}
            strokeWidth="1"
          />
        ))}

        {/* Spokes from center */}
        {entries.map(([_, __], i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon filled */}
        <polygon
          points={polygonPath}
          fill="url(#floralRadarGlow)"
          stroke="#9333EA"
          strokeWidth="2"
          className="transition-all duration-500"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#FFFFFF"
              stroke="#9333EA"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* Accord labels */}
        {entries.map(([name, _], i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          let anchor: 'middle' | 'start' | 'end' = 'middle';
          if (Math.cos(angle) > 0.3) anchor = 'start';
          else if (Math.cos(angle) < -0.3) anchor = 'end';

          return (
            <text
              key={i}
              x={lx}
              y={ly + 4}
              textAnchor={anchor}
              className="text-[11px] font-sans fill-[#4E4A56] font-semibold tracking-wider select-none"
            >
              {name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
