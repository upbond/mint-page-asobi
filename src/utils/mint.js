import Web3 from "web3";
import web3Obj from "./embedHelper";
import mintABI from "config/Mint.json";
const { REACT_APP_MINTING_NFT_SC } = process.env

const minting = async (address, quantity) => {
    console.log(address, quantity, "@2");
    const { upbond } = web3Obj;
    const web3 = new Web3(upbond.provider || window.web3.currentProvider);
    const mintContract = new web3.eth.Contract(mintABI, REACT_APP_MINTING_NFT_SC);
    try {
        
    } catch (error) {
        console.log("Error mint:", error.message);
    }
} 

export {
    minting
};