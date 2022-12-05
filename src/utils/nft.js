import Web3 from "web3";
// import Contract from "../config/NFT.json";
// import { getAddress, privKeyTo64 } from "./openLogin";
// import { GetOtpCode, PostTransferGsn } from "../services/nft";
import Swal from "sweetalert2";
// import { encrypt } from "./helper";
import { RelayProvider } from "@opengsn/provider";
// import MinterAbi from "config/Minter.json";
import MumbaiMinterAbi from "config/MumbaiMinter.json";

// import GSN1155Abi from "config/GSNNFT.json";
import web3HttpProvider from "web3-providers-http";
import { ethers } from "ethers";
import Moralis from "moralis";
// import moment from "moment";
import web3Obj from "./embedHelper";
// import { useCustomAuth } from "./customAuth";
const {
  REACT_APP_POLYGON_PROVIDER,
  REACT_APP_GFA_ADDRESS,
  REACT_APP_GFA_CONTRACT,
  REACT_APP_GSN_NFT_POAP,
//   REACT_APP_GSN_MINTER_POAP,
//   REACT_APP_GSN_PAYMASTER,
  REACT_APP_MORALIS_SERVER,
  REACT_APP_MORALIS_APP_ID,

  REACT_APP_GSN_MUMBAI_NFT,
  REACT_APP_GSN_MUMBAI_MINTER,
  REACT_APP_GSN_MUMBAI_PAYMASTER,
  REACT_APP_EVENT_ID,
} = process.env;
const serverUrl = REACT_APP_MORALIS_SERVER;
const appId = REACT_APP_MORALIS_APP_ID;
Moralis.start({ serverUrl, appId });

const web3 = new Web3(REACT_APP_POLYGON_PROVIDER || window.location.origin);
const providerWeb3 = new Web3(REACT_APP_POLYGON_PROVIDER);
// const provider = new Web3.providers.HttpProvider(REACT_APP_POLYGON_PROVIDER)

// const transferNft = async (tokenId, amount, to = REACT_APP_GFA_ADDRESS) => {
//   try {
//     const address = await getAddress();
//     const privateKey = privKeyTo64();
//     const accounts = await web3.eth.accounts.wallet.add({
//       privateKey: `0x${privateKey}`,
//       address,
//     });

//     const contract = await new web3.eth.Contract(
//       Contract.abi,
//       REACT_APP_GFA_CONTRACT,
//       {
//         from: address,
//       }
//     );

//     const contractMethod = await contract.methods.safeTransferFrom(
//       accounts.address,
//       to,
//       tokenId,
//       amount,
//       "0x00"
//     );
//     const estimateGas = await contractMethod.estimateGas({
//       from: accounts.address,
//     });
//     const gasPrice = await web3.eth.getGasPrice();

//     const encodedData = await contractMethod.send({
//       from: accounts.address,
//       gas: estimateGas,
//       gasPrice: gasPrice,
//     });

//     return encodedData;
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: error,
//     });
//   }
// };

// const transferGsnNft = async (tokenId, amount, to = REACT_APP_GFA_ADDRESS) => {
//   try {
//     //const address = await getAddress();
//     const otp = await GetOtpCode();
//     const privateKey = privKeyTo64();
//     const payload = {
//       caller: privateKey,
//       target: to,
//       id: tokenId,
//       amount: amount,
//       code: otp.data,
//     };

//     const encodePayload = await encrypt(payload);
//     //console.log(encodePayload)
//     //const decodePayload = await decrypt(encodePayload);
//     //console.log(decodePayload)
//     const result = await PostTransferGsn({ signature: encodePayload });

//     return result;
//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: error,
//     });
//   }
// };

// const spendDrink = async (code, data) => {
//   const key = "5613";

//   if (code === key) {
//     const nft = await transferGsnNft(data.token_id, data.amount);
//     console.log(nft);
//     if (nft) return true;
//   }

//   return false;
// };

// const prv = new ethers.providers.JsonRpcProvider(REACT_APP_POLYGON_PROVIDER);

// // MINT AIRDROP NON GSN WEB3.JS
// const airdropNft = async () => {
//   const getNumb = localStorage.getItem("subkey");
//   try {
//     if (providerWeb3) {
//       try {
//         console.log(providerWeb3, "get providers");
//         const accounts = providerWeb3.eth.accounts.wallet.add(getNumb);
//         const minter = new providerWeb3.eth.Contract(
//           MinterAbi,
//           "0x4579a249f6a64f92A4CC477ce3a8E463b7647e3d"
//         );
//         console.log(minter, "minter");
//         const getDomainData = await minter.methods.DOMAIN_SEPARATOR().call();
//         if (getDomainData) {
//           const encode = providerWeb3.utils.encodePacked(
//             { value: getDomainData, type: "bytes32" },
//             { value: accounts.address, type: "address" }
//           );
//           console.log(encode, "get encode packed");
//           if (encode) {
//             const encodeKeccak = providerWeb3.utils.keccak256(encode);
//             const dropNft = await minter.methods.claim(encodeKeccak).send({
//               from: accounts.address,
//               gas: 300000,
//             });
//             console.log(dropNft, "in dropNft");
//           }
//         }
//       } catch (error) {
//         console.log("Error mint:", error.message);
//       }
//     }
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// };
// // END MINT AIRDROP NON GSN

// // MINT AIRDROP GSN ETHER
// const airdropNftEther = async () => {
//   const getNumb = localStorage.getItem("torus-app");
//   console.log(getNumb, "NUMBS");
//   // const conf = {
//   //   paymasterAddress: REACT_APP_GSN_MUMBAI_PAYMASTER, //paymaster from contract address
//   //   // // Rinkeby
//   //   // relayLookupWindowBlocks: 1e5,
//   //   // relayRegistrationLookupBlocks: 1e5,
//   //   // pastEventsQueryMaxPageSize: 2e4,

//   //   // Mumbai
//   //   relayLookupWindowBlocks: 990,
//   //   relayRegistrationLookupBlocks: 990,
//   //   pastEventsQueryMaxPageSize: 990,
//   // };
//   // try {
//   //   const providerWeb3Http = await new web3HttpProvider(
//   //     REACT_APP_POLYGON_PROVIDER
//   //   );
//   //   const relay = await RelayProvider.newProvider({
//   //     provider: providerWeb3Http,
//   //     config: conf,
//   //   }).init();
//   //   relay.addAccount(getNumb); //addAccount from privatekey
//   //   const etherGsnProvider = new ethers.providers.Web3Provider(relay);
//   //   const accounts = new ethers.Wallet(getNumb, etherGsnProvider); //privatekey
//   //   const signer = etherGsnProvider.getSigner(accounts.address);
//   //   const factory = new ethers.Contract(
//   //     REACT_APP_GSN_MUMBAI_MINTER,
//   //     MumbaiMinterAbi,
//   //     signer
//   //   ); //contract minter
//   //   const getDomain = await factory.DOMAIN_SEPARATOR();
//   //   const keccak = ethers.utils.keccak256(
//   //     ethers.utils.solidityPack(
//   //       ["bytes32", "address"],
//   //       [getDomain, accounts.address]
//   //     )
//   //   );
//   //   const getAirdrop = await factory.claim(2, keccak);
//   //   localStorage.setItem("claim", JSON.stringify(true));
//   //   await getAirdrop.wait();
//   //   if (getAirdrop.hash) {
//   //     await prv.getTransactionReceipt(getAirdrop.hash).then((data) => {
//   //       console.log(data, "receipt");
//   //       // localStorage.setItem("claim", JSON.stringify(true));
//   //       return data.transactionHash;
//   //     });
//   //   }
//   // } catch (e) {
//   //   console.log("Error ether: ", e.message);
//   //   return e.message;
//   // }
// };
// // END MINT AIRDROP GSN ETHER

// // Getnft
// const getNfts = async (acc) => {
//   const getAddress = localStorage.getItem("walletaddress");
//   const options = {
//     address: acc,
//     chain: "mumbai",
//     // chain: "0x4",
//     token_address: REACT_APP_GSN_MUMBAI_NFT, //nft contract
//   };
//   const metaData = await Moralis.Web3API.account.getNFTsForContract(options);
//   if (metaData) {
//     const arrayData = metaData.result;
//     let pushMeta = [];
//     for (let index = 0; index < arrayData.length; index++) {
//       const element = arrayData[index];
//       const metadata = JSON.parse(element.metadata);
//       const m = { ...element, meta: { ...metadata } };
//       pushMeta.push(m);
//     }
//     return pushMeta;
//   }
// };
// // End getnft

// const checkClaim = async () => {
//   const getNumb = localStorage.getItem("subkey");
//   const accounts = new ethers.Wallet(getNumb, prv); //privatekey
//   const signer = prv.getSigner(accounts.address);
//   const factory = new ethers.Contract(
//     REACT_APP_GSN_NFT_POAP, //nft contract
//     GSN1155Abi,
//     signer
//   );
//   let maxSupply = [2]; //event id
//   for (let index = 0; index < maxSupply.length; index++) {
//     const element = maxSupply[index];
//     const getMaxSupply = await factory.eventSupply(element);
//     const formatMaxSupply = ethers.utils.formatUnits(getMaxSupply, 0);
//     const getTotalClaim = await factory.totalSupply(element);
//     const formatTotalClaim = ethers.utils.formatUnits(getTotalClaim, 0);
//     if (parseInt(formatTotalClaim) >= parseInt(formatMaxSupply)) {
//       return false;
//     } else {
//       return true;
//     }
//   }
//   return true;
// };

// const checkEndTimeClaim = async () => {
//   const getNumb = localStorage.getItem("subkey");
//   const accounts = new ethers.Wallet(getNumb, prv); //privatekey
//   const signer = prv.getSigner(accounts.address);
//   const factory = new ethers.Contract(
//     REACT_APP_GSN_NFT_POAP, //nft contract
//     GSN1155Abi,
//     signer
//   );

//   const getTime = await factory.eventTime(2); //event id
//   const formatTimeEndEvent = ethers.utils.formatUnits(getTime.endEvent, 0);
//   const formatEventTime = new Date(formatTimeEndEvent * 1000);
//   if (formatEventTime > Date.now()) {
//     return true;
//   } else {
//     return false;
//   }
// };

const mintNft = async (acc, walletType) => {
  const nWeb3 = web3Obj.web3;
  const conf = {
    paymasterAddress: REACT_APP_GSN_MUMBAI_PAYMASTER, //paymaster from contract address
    // Mumbai
    relayLookupWindowBlocks: 990,
    relayRegistrationLookupBlocks: 990,
    pastEventsQueryMaxPageSize: 990,
  };
  // console.log(conf, "conf");
  try {
    const providerWeb3Http = await new web3HttpProvider(
      REACT_APP_POLYGON_PROVIDER
    );
    const relay = await RelayProvider.newProvider({
      // provider: window.ethereum,
      provider: walletType === "metamask" ? window.ethereum : nWeb3.currentProvider,
      // provider: web3Obj.upbond.provider,
      config: conf,
    }).init();
    console.log(relay, "relay");
    const provider = new ethers.providers.Web3Provider(relay);
    console.log(provider, " provider");
    const signer = await provider.getSigner(acc[0]);
    console.log(signer, "signers");
    const factory = new ethers.Contract(
      REACT_APP_GSN_MUMBAI_MINTER, //nft contract
      MumbaiMinterAbi,
      signer
    );
    // console.log(factory, "factory");

    const getDomain = await factory.DOMAIN_SEPARATOR();
    console.log(getDomain, "getDomain separator");
    const keccak = ethers.utils.keccak256(
      ethers.utils.solidityPack(
        ["bytes32", "address"],
        // [getDomain, accounts.address]
        [getDomain, acc[0]]
      )
    );
    console.log(keccak, "getdomain");
    const claimNft = await factory.claim(REACT_APP_EVENT_ID, keccak);
    console.log(claimNft, "claimnft");
    const getTx = await claimNft.wait();
    console.log(getTx, "getTx");
    return getTx;
    // return txData;
  } catch (error) {
    console.log(error, "errorrrrrrrr");
    return "err";
  }
};

export {
//   transferNft,
//   transferGsnNft,
//   spendDrink,
//   airdropNft,
//   airdropNftEther,
//   getNfts,
//   checkClaim,
//   checkEndTimeClaim,
  mintNft,
};
