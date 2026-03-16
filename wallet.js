'use strict';

const WALLET_KEY = "finguard_wallet";

function getWallet() {

  let wallet = JSON.parse(localStorage.getItem(WALLET_KEY));

  if (!wallet) {
    wallet = {
      balance: 482340,
      transactions: []
    };

    localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  }

  return wallet;
}

function saveWallet(wallet) {
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
}

function debit(amount, merchant) {

  const wallet = getWallet();

  wallet.balance -= Number(amount);

  wallet.transactions.unshift({
    id: "txn" + Date.now(),
    merchant,
    amount: -Number(amount),
    method: "UPI",
    date: new Date().toISOString()
  });

  saveWallet(wallet);
}

function credit(amount, source) {

  const wallet = getWallet();

  wallet.balance += Number(amount);

  wallet.transactions.unshift({
    id: "txn" + Date.now(),
    merchant: source,
    amount: Number(amount),
    method: "Reward",
    date: new Date().toISOString()
  });

  saveWallet(wallet);
}