import { motion } from 'framer-motion';

export default function TopRepos({ repos }) {
  const top = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  if (!top.length) return null;
  return (
    <div className="card">
      <h3>Top repositories</h3>
      <div className="repos">
        {top.map((r, i) => (
          <motion.a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="repo"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            whileHover={{ y: -4, borderColor: 'rgba(88,166,255,.6)' }}>
            <b>{r.name}</b>
            <p className="muted small">{r.description || 'No description provided.'}</p>
            <div className="meta small muted">
              {r.language && <span>● {r.language}</span>}
              <span>★ {r.stargazers_count}</span>
              <span>⑂ {r.forks_count}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
