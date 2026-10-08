import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
const COLORS = ['#58a6ff', '#2ea043', '#a371f7', '#f78166', '#e3b341', '#39c5cf', '#db61a2', '#8b949e'];

export default function Languages({ data }) {
  if (!data.length) return <div className="card"><h3>Languages</h3><p className="muted">No language data found.</p></div>;
  const top = data.slice(0, 8);
  return (
    <div className="card">
      <h3>Languages</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={top} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3} stroke="none">
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: 'var(--solid)', border: '1px solid var(--bd)', borderRadius: 8 }} itemStyle={{ color: 'var(--tx)' }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {top.map((l, i) => (
          <span key={l.name}><i style={{ background: COLORS[i % COLORS.length] }} />{l.name} <em className="muted">{l.value}</em></span>
        ))}
      </div>
    </div>
  );
}
