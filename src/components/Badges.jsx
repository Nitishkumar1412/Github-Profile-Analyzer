import { motion } from 'framer-motion';

export default function Badges({ badges }) {
  const earned = badges.filter((b) => b.got).length;
  return (
    <div className="card">
      <div className="row"><h3>Achievements</h3><span className="muted small">{earned} of {badges.length} unlocked</span></div>
      <div className="badges">
        {badges.map((b, i) => (
          <motion.div key={b.name} className={`badge ${b.got ? '' : 'locked'}`} title={b.desc}
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i, type: 'spring' }}
            whileHover={{ scale: 1.06 }}>
            <span className="emoji">{b.icon}</span><b>{b.name}</b><span className="muted small">{b.desc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
