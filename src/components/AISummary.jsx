import { useEffect, useState } from 'react';
import { aiSummary } from '../ai';

export default function AISummary({ data }) {
  const [s, setS] = useState(null);
  const run = () => { setS(null); aiSummary(data).then(setS); };
  useEffect(run, [data.user.login]);
  return (
    <div className="card">
      <div className="row"><h3>AI summary</h3><button className="ghost" onClick={run}>Regenerate</button></div>
      {s ? <><p className="ai-text">{s.text}</p><span className="muted small">{s.source}</span></>
         : <div className="loader sm"><span /><span /><span /></div>}
    </div>
  );
}
