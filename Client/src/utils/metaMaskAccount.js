import Web3 from "web3";

const getAccount = async () =>{
    if (window.ethereum) {
      // Use MetaMask's provider
      const web3 = new Web3(window.ethereum);
    
      // Request account access if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User denied account access');
      }
    
      // Now you can use web3 to interact with the Ethereum blockchain
      const accounts = await web3.eth.getAccounts();
      return accounts[0]
    } else {
      console.error('MetaMask is not installed');
    }
  }

  export {getAccount};