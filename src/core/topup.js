const { ethers } = require('ethers');
const walletManager = require('../managers/wallet');
const proxyManager = require('../managers/proxy');
const networkManager = require('../managers/network');
const logger = require('../utils/logger');

class TopupHandler {
  static THRESHOLD = 1.5;

  static async execute(farmerWallet, targetChain) {
    const balance = await walletManager.getBalance(farmerWallet, targetChain);
    if (balance >= this.THRESHOLD) return false;

    const sourceChain = await this._findSourceChain();
    if (!sourceChain) {
      logger.error(`[TOPUP] No funds in topup wallet for ${farmerWallet}`);
      return false;
    }

    const amount = (Math.random() * 0.5) + 1.5; // 1.5-2 ETH
    return this._sendTopup(sourceChain, targetChain, amount);
  }

  static async _sendTopup(sourceChain, targetChain, amount) {
    const provider = new ethers.JsonRpcProvider(
      networkManager.getRpcUrl(sourceChain),
      proxyManager.getTopupProxy() // Pakai proxy static
    );

    const wallet = new ethers.Wallet(
      walletManager.getWallet('topup').privateKey,
      provider
    );

    const tx = await wallet.sendTransaction({
      to: walletManager.getWallet(targetChain).address,
      value: ethers.parseEther(amount.toString())
    });

    logger.log(`[TOPUP] Success: ${amount} ETH to ${targetChain} (TX: ${tx.hash})`);
    return tx.hash;
  }
}

module.exports = TopupHandler;