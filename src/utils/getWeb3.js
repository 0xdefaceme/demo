import Web3 from "web3";

import config from "../config";

function resolveWeb3(resolve, reject, localProvider, authentication) {
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    if (authentication === true) {
      try {
        window.ethereum.enable().then(() => resolve(web3));
      } catch (err) {
        reject(err);
        console.log(err);
      }
    } else {
      resolve(web3);
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    resolve(web3);
  } else {
    if (authentication === true) {
      reject(new Error(
        "Non-Ethereum browser detected. Cannot work in authenticated mode"
      ));
    }
    web3 = new Web3(localProvider);
    console.log(`Non-Ethereum browser detected. Using ${localProvider}.`);
    resolve(web3);
  }
}

function _getWeb3(localProvider, authentication) {
  if (localProvider === undefined) {
    localProvider =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8545"
        : "https://"+config.TARGET_NETWORK+".infura.io";
  }

  return new Promise((resolve, reject) => {
    window.addEventListener("load", () => {
      resolveWeb3(resolve, reject, localProvider, authentication);
    });
    if (document.readyState === "complete") {
      resolveWeb3(resolve, reject, localProvider, authentication);
    }
  });
}

export function getWeb3(localProvider) {
  return _getWeb3(localProvider, true);
}

export function getWeb3Anon(localProvider) {
  return _getWeb3(localProvider, false);
}
