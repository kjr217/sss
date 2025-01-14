import React, {useEffect, useState} from "react";
import './App.css';

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        const {ethereum} = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account)
        } else {
            console.log("No authorized account found")
        }
    }

    const connectWallet = async () => {
        try {
            const {ethereum} = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    // Render Methods
    const renderNotConnectedContainer = () => (
        <button onClick={connectWallet} className="cta-button connect-wallet-button">
            Connect to Wallet
        </button>
    );

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <div className="container">
            <div className="vertical-center">
                <h1>Superfluid<br/>Subscription<br/>Service</h1>
                {currentAccount === "" ? (
                    renderNotConnectedContainer()
                ) : (
                    <button onClick={null} className="cta-button connect-wallet-button">
                        Mint NFT
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;