import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend, ResponsiveContainer } from 'recharts';

const rows = (d) => [
  ['Developer score', d.score.total], ['Repositories', d.repos.length], ['Total stars', d.score.stars],
  ['Followers', d.user.followers], ['Contributions (1y)', d.score.yearly], ['Languages', d.score.langCount],
  ['Longest streak (days)', d.streak.longest], ['Badges earned', d.badges.filter((b) => b.got).length],
];

export default function Compare({ x, y }) {
  const rx = rows(x), ry = rows(y);
  const wx = rx.filter((r, i) => r[1] > ry[i][1]).length, wy = rx.filter((r, i) => r[1] < ry[i][1]).length;
  const leader = wx === wy ? null : wx > wy ? x : y;
  const radar = x.score.parts.map((p, i) => ({ k: p.key, a: p.pct, b: y.score.parts[i].pct }));
  const head = (d, cls) => (
    <div className={`vs-head ${cls}`}>
      <img src={d.user.avatar_url} alt={d.user.login} className="avatar sm" />
      <div><b>{d.user.name || d.user.login}</b><div className="muted small">@{d.user.login} · {d.score.grade}</div></div>
    </div>
  );
  return (
    <div className="grid">
      <div className="card span2">
        <div className="vs">{head(x, 'a')}<span className="vs-tag">VS</span>{head(y, 'b')}</div>
        <p className="muted center">
          {leader ? `${leader.user.name || leader.user.login} leads in ${Math.max(wx, wy)} of ${rx.length} categories.` : 'Evenly matched.'}
        </p>
      </div>
      <div className="card">
        <h3>Skill radar</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radar}>
            <PolarGrid stroke="rgba(139,148,158,.3)" />
            <PolarAngleAxis dataKey="k" tick={{ fill: '#8b949e', fontSize: 11 }} />
            <Radar name={x.user.login} dataKey="a" stroke="#58a6ff" fill="#58a6ff" fillOpacity={0.3} />
            <Radar name={y.user.login} dataKey="b" stroke="#2ea043" fill="#2ea043" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="card">
        <h3>Head to head</h3>
        <table className="cmp">
          <thead><tr><th /><th className="a">{x.user.login}</th><th className="b">{y.user.login}</th></tr></thead>
          <tbody>
            {rx.map(([label, v], i) => (
              <tr key={label}>
                <td className="muted">{label}</td>
                <td className={v > ry[i][1] ? 'win' : ''}>{v.toLocaleString()}</td>
                <td className={ry[i][1] > v ? 'win' : ''}>{ry[i][1].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
