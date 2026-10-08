export function getBadges(user, repos, score, streak) {
  const years = (Date.now() - new Date(user.created_at)) / (365 * 864e5);
  const forks = repos.reduce((s, r) => s + r.forks_count, 0);
  return [
    { icon: '🌱', name: 'Rising star', desc: '10+ total stars', got: score.stars >= 10 },
    { icon: '⭐', name: 'Star collector', desc: '100+ total stars', got: score.stars >= 100 },
    { icon: '🌐', name: 'Polyglot', desc: '5+ languages', got: score.langCount >= 5 },
    { icon: '📦', name: 'Prolific', desc: '25+ original repos', got: repos.length >= 25 },
    { icon: '🍴', name: 'Forked often', desc: '25+ forks received', got: forks >= 25 },
    { icon: '👥', name: 'Community favourite', desc: '100+ followers', got: user.followers >= 100 },
    { icon: '🔥', name: 'On fire', desc: '7+ day streak', got: streak.longest >= 7 },
    { icon: '🏔️', name: 'Consistent', desc: '30+ day streak', got: streak.longest >= 30 },
    { icon: '🎖️', name: 'Veteran', desc: '5+ years on GitHub', got: years >= 5 },
    { icon: '🏆', name: 'Elite', desc: 'Developer score 80+', got: score.total >= 80 },
  ];
}
