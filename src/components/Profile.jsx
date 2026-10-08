import { motion } from 'framer-motion';

export default function Profile({ user, stars, yearly }) {
  const stats = [
    ['Repositories', user.public_repos], ['Followers', user.followers],
    ['Following', user.following], ['Total stars', stars], ['Contributions (1y)', yearly],
  ];
  return (
    <div className="card profile">
      <motion.img src={user.avatar_url} alt={user.login} className="avatar"
        initial={{ scale: 0.6, rotate: -8, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }} />
      <div className="grow">
        <h2>{user.name || user.login}</h2>
        <a href={user.html_url} target="_blank" rel="noreferrer" className="muted">@{user.login}</a>
        {user.bio && <p>{user.bio}</p>}
        <p className="muted small">
          {[user.location, user.company, `Joined ${new Date(user.created_at).getFullYear()}`].filter(Boolean).join(' • ')}
        </p>
        <div className="stats">
          {stats.map(([label, v]) => (
            <div key={label}><b>{v.toLocaleString()}</b><span className="muted small">{label}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
