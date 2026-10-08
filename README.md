<div align="center">

# 🔍 GitHub Profile Analyzer

**Analyze any public GitHub profile in seconds: languages, contribution heatmap, top repos, achievements and a 0-100 developer score.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea043?style=for-the-badge&logo=netlify&logoColor=white)](https://gitpulse-analyzer.netlify.app/)
![React](https://img.shields.io/badge/React-18-58a6ff?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-a371f7?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-8b949e?style=for-the-badge)


</div>

## ✨ Features

- **Developer score (0-100):** A weighted score across six metrics, shown as an animated ring and radar chart.
- **Contribution heatmap:** The last 12 months of activity in a GitHub-style grid.
- **Language breakdown:** Donut chart of the languages used across original repositories.
- **Top repositories:** The most-starred repos with description, language, stars and forks.
- **Achievements and badges:** 10 unlockable badges such as Polyglot, On fire, Veteran and Elite.
- **Compare mode:** Put two developers side by side with an overlaid radar chart and a head-to-head table.
- **AI summary:** A short written review with strengths, gaps and next steps. Works offline with built-in insights, or with a real LLM when a token is provided.
- **Shareable links:** Every analysis has a URL, for example `?user=torvalds&vs=gaearon`.
- **Dark and light themes:** Frosted-glass UI over a blurred, animated GitHub-style background.
- **No backend:** Everything runs in the browser using the public GitHub API.

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 18, Vite |
| Charts | Recharts |
| Animation | Framer Motion |
| Styling | Plain CSS with variables, `backdrop-filter` |
| Data | GitHub REST API, GitHub contributions API |
| AI (optional) | Hugging Face Inference API (Llama 3.1) |

## 🚀 Getting Started

**Prerequisites:** Node.js 18 or newer.

```bash
# 1. Clone the repository
git clone https://https://github.com/Nitishkumar1412/Github-Profile-Analyzer
cd github-profile-analyzer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production build

```bash
npm run build
npm run preview
```

## 🔐 Environment Variables (optional)

Copy `.env.example` to `.env`:

| Variable | Purpose |
| --- | --- |
| `VITE_GITHUB_TOKEN` | Raises the GitHub API limit from 60 to 5,000 requests per hour. Use a token with no scopes. |
| `VITE_HF_TOKEN` | Enables the LLM-powered AI summary through Hugging Face. Without it, the app uses built-in rule-based insights. |

> ⚠️ Vite embeds these values in the browser bundle. Use them for local development only, and do not add real tokens to a public deployment.

## 📊 How the Developer Score Works

| Metric | Max points | Based on |
| --- | --- | --- |
| Activity | 25 | Contributions in the last year |
| Stars | 25 | Total stars on original repos (log scale) |
| Followers | 15 | Follower count (log scale) |
| Languages | 15 | Number of distinct languages |
| Repositories | 10 | Number of original repos |
| Tenure | 10 | Years on GitHub |

Grades: **Elite** (80+), **Advanced** (60+), **Rising** (40+), **Growing** (20+), **Getting started**.

## 📁 Project Structure

```
github-profile-analyzer/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx            # search, compare toggle, theme, share links
    ├── api.js             # GitHub API and contribution calendar
    ├── score.js           # score, language stats, streaks
    ├── badges.js          # achievement rules
    ├── ai.js              # AI summary (LLM with offline fallback)
    ├── index.css
    └── components/
        ├── Profile.jsx
        ├── Score.jsx
        ├── Languages.jsx
        ├── Heatmap.jsx
        ├── TopRepos.jsx
        ├── Badges.jsx
        ├── AISummary.jsx
        └── Compare.jsx
```


## 🤝 Contributing

Issues and pull requests are welcome. Fork the repo, create a feature branch and open a PR.


<div align="center">Made by <a href="https://github.com/Nitishkumar1412"> Nitish Kumar </a></div>
