const cap = (v, max) => Math.min(max, v);

export function languageStats(repos) {
  const map = {};
  repos.forEach((r) => r.language && (map[r.language] = (map[r.language] || 0) + 1));
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

export function calcScore(user, repos, contributions) {
  const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const yearly = contributions ? contributions.reduce((s, d) => s + d.count, 0) : 0;
  const years = (Date.now() - new Date(user.created_at)) / (365 * 864e5);
  const langs = languageStats(repos).length;

  const parts = [
    { key: 'Repos', value: cap(repos.length / 3, 10), max: 10 },
    { key: 'Stars', value: cap(Math.log10(stars + 1) * 9, 25), max: 25 },
    { key: 'Followers', value: cap(Math.log10(user.followers + 1) * 6, 15), max: 15 },
    { key: 'Activity', value: cap(yearly / 20, 25), max: 25 },
    { key: 'Languages', value: cap(langs * 2.5, 15), max: 15 },
    { key: 'Tenure', value: cap(years * 2, 10), max: 10 },
  ];
  const total = Math.round(parts.reduce((s, p) => s + p.value, 0));
  const grade = total >= 80 ? 'Elite' : total >= 60 ? 'Advanced' : total >= 40 ? 'Rising' : total >= 20 ? 'Growing' : 'Getting started';
  return { total, grade, stars, yearly, langCount: langs, parts: parts.map((p) => ({ ...p, pct: Math.round((p.value / p.max) * 100) })) };
}

export function streaks(c) {
  if (!c) return { current: 0, longest: 0 };
  let run = 0, longest = 0;
  c.forEach((d) => { run = d.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); });
  let i = c.length - 1, current = 0;
  if (i >= 0 && c[i].count === 0) i--;
  for (; i >= 0 && c[i].count > 0; i--) current++;
  return { current, longest };
}
