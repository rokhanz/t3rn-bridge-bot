const DESKTOP_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_0)'
];

const MOBILE_AGENTS = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
  'Mozilla/5.0 (Android 12; Mobile; rv:68.0)'
];

function getRandomAgent() {
  return Math.random() > 0.3 
    ? DESKTOP_AGENTS[Math.floor(Math.random() * DESKTOP_AGENTS.length)]
    : MOBILE_AGENTS[Math.floor(Math.random() * MOBILE_AGENTS.length)];
}

module.exports = { getRandomAgent };