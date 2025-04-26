const fs = require('fs');
const { getRandomAgent } = require('../utils/userAgent');

class ProxyManager {
  constructor() {
    this.rotationProxies = this._loadProxies('./config/proxies/rotation_proxies.txt');
  }

  // Untuk MAIN WALLET (rotasi)
  getMainWalletProxy() {
    return {
      url: this.rotationProxies[Math.floor(Math.random() * this.rotationProxies.length)],
      headers: { 'User-Agent': getRandomAgent() }
    };
  }

  // Untuk FARMER WALLET (static)
  getFarmerProxy(walletId) {
    const proxyMap = {
      farmerA: process.env.FARMERA_PROXY,
      farmerB: process.env.FARMERB_PROXY,
      farmerC: process.env.FARMERC_PROXY
    };
    return {
      url: proxyMap[walletId],
      headers: { 'User-Agent': getRandomAgent() }
    };
  }

  // Untuk TOPUP WALLET (static custom)
  getTopupProxy() {
    return {
      url: process.env.TOPUP_PROXY,
      headers: { 
        'User-Agent': getRandomAgent(),
        'X-Forwarded-For': process.env.TOPUP_PROXY.split('@')[1].split(':')[0]
      }
    };
  }

  _loadProxies(path) {
    return fs.readFileSync(path, 'utf-8')
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'));
  }
}

module.exports = new ProxyManager();