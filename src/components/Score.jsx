import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export default function Score({ score }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, score.total, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [score.total]);

  const R = 52, C = 2 * Math.PI * R;
  return (
    <div className="card">
      <h3>Developer score</h3>
      <div className="score-wrap">
        <div className="ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2ea043" /><stop offset="100%" stopColor="#58a6ff" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r={R} className="track" />
            <circle cx="60" cy="60" r={R} className="bar" stroke="url(#g)"
              strokeDasharray={C} strokeDashoffset={C - (C * n) / 100} />
          </svg>
          <div className="ring-text"><b>{n}</b><span className="muted small">{score.grade}</span></div>
        </div>
        <div className="radar">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={score.parts.map((p) => ({ k: p.key, v: p.pct }))}>
              <PolarGrid stroke="rgba(240,246,252,.15)" />
              <PolarAngleAxis dataKey="k" tick={{ fill: '#8b949e', fontSize: 11 }} />
              <Radar dataKey="v" stroke="#58a6ff" fill="#58a6ff" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
