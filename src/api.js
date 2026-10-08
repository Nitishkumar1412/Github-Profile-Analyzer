const GH = 'https://api.github.com';
const token = import.meta.env.VITE_GITHUB_TOKEN;
const headers = token ? { Authorization: `Bearer ${token}` } : {};

async function get(path) {
  const res = await fetch(GH + path, { headers });
  if (res.status === 404) throw new Error('User not found. Check the username and try again.');
  if (res.status === 403) throw new Error('GitHub API rate limit reached (60/hour). Try again later or add a token in .env.');
  if (!res.ok) throw new Error('Could not reach GitHub. Try again.');
  return res.json();
}

// Full-year contribution calendar (public, CORS-enabled, no token needed)
async function getContributions(username) {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (res.ok) return (await res.json()).contributions;
  } catch { /* fall through */ }
  return null;
}

export async function fetchProfile(username) {
  const [user, repos, contributions] = await Promise.all([
    get(`/users/${username}`),
    get(`/users/${username}/repos?per_page=100&sort=pushed`),
    getContributions(username),
  ]);
  return { user, repos: repos.filter((r) => !r.fork), contributions };
}
