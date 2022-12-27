import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
      if (window?.solana?.isPhantom) {
        const response = await window.solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    };

    const connectWallet = async () => {
      const { solana } = window;
    
      if (solana) {
        const response = await solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      }
    };

  /*
    * We want to render this UI when the user hasn't connected
    * their wallet to our app yet.
    */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
  
  useEffect(() => {
      const onLoad = async () => {
        await checkIfWalletIsConnected();
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
