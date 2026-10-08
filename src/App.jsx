import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProfile } from './api';
import { calcScore, languageStats, streaks } from './score';
import { getBadges } from './badges';
import Profile from './components/Profile';
import Score from './components/Score';
import Languages from './components/Languages';
import Heatmap from './components/Heatmap';
import TopRepos from './components/TopRepos';
import Badges from './components/Badges';
import AISummary from './components/AISummary';
import Compare from './components/Compare';

const stagger = { show: { transition: { staggerChildren: 0.12 } } };
const item = { hide: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

async function load(username) {
  const { user, repos, contributions } = await fetchProfile(username);
  const score = calcScore(user, repos, contributions);
  const streak = streaks(contributions);
  return { user, repos, contributions, score, streak, langs: languageStats(repos), badges: getBadges(user, repos, score, streak) };
}

export default function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; } });
  const [compare, setCompare] = useState(false);
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [state, setState] = useState({ status: 'idle' });
  const [toast, setToast] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  async function run(u1, u2) {
    setState({ status: 'loading' });
    try {
      const [x, y] = await Promise.all([load(u1), u2 ? load(u2) : null]);
      setState({ status: 'done', x, y });
      const p = new URLSearchParams({ user: u1 });
      if (u2) p.set('vs', u2);
      history.replaceState(null, '', '?' + p);
    } catch (err) {
      setState({ status: 'error', message: err.message });
    }
  }

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const u = p.get('user'), v = p.get('vs');
    if (u) { setA(u); if (v) { setB(v); setCompare(true); } run(u, v); }
  }, []);

  function submit(e) {
    e.preventDefault();
    const u1 = a.trim(), u2 = b.trim();
    if (!u1) return;
    if (compare && !u2) return setState({ status: 'error', message: 'Enter both usernames to compare.' });
    run(u1, compare ? u2 : null);
  }

  async function share() {
    try { await navigator.clipboard.writeText(location.href); setToast('Link copied to clipboard'); }
    catch { setToast('Copy the link from your address bar'); }
    setTimeout(() => setToast(''), 2200);
  }

  const { status, x, y, message } = state;

  return (
    <>
      <div className="bg"><div className="orb o1" /><div className="orb o2" /><div className="orb o3" /></div>
      <button className="theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle light and dark mode">{theme === 'dark' ? '☀️' : '🌙'}</button>
      <main className="container">
        <motion.header className="hero" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <svg height="48" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.66 3.96.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <h1>GitHub Profile Analyzer</h1>
          <p className="muted">Languages, contribution heatmap, top repositories and a developer score for any public profile.</p>
          <div className="modes">
            <button className={!compare ? 'on' : ''} onClick={() => setCompare(false)}>Single profile</button>
            <button className={compare ? 'on' : ''} onClick={() => setCompare(true)}>Compare two</button>
          </div>
          <form onSubmit={submit} className="search">
            <input value={a} onChange={(e) => setA(e.target.value)} placeholder="GitHub username, e.g. torvalds" aria-label="GitHub username" />
            {compare && <input value={b} onChange={(e) => setB(e.target.value)} placeholder="Second username" aria-label="Second GitHub username" />}
            <button disabled={status === 'loading'}>{status === 'loading' ? 'Analyzing…' : compare ? 'Compare' : 'Analyze'}</button>
          </form>
        </motion.header>

        <AnimatePresence mode="wait">
          {status === 'loading' && <motion.div key="l" className="loader" exit={{ opacity: 0 }}><span /><span /><span /></motion.div>}
          {status === 'error' && <motion.p key="e" className="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{message}</motion.p>}
          {status === 'done' && (
            <motion.div key={x.user.login + (y?.user.login || '')} initial="hide" animate="show" variants={stagger}>
              <div className="actions"><button className="ghost" onClick={share}>🔗 Share this analysis</button></div>
              {y ? <motion.div variants={item}><Compare x={x} y={y} /></motion.div> : (
                <div className="grid">
                  {[
                    <Profile user={x.user} stars={x.score.stars} yearly={x.score.yearly} />,
                    <Score score={x.score} />,
                    <Languages data={x.langs} />,
                    <Badges badges={x.badges} />,
                    <AISummary data={x} />,
                    <Heatmap data={x.contributions} />,
                    <TopRepos repos={x.repos} />,
                  ].map((c, i) => (
                    <motion.div key={i} className={i === 0 || i >= 3 ? 'span2' : ''} variants={item}>{c}</motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
