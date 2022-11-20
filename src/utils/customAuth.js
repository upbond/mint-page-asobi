/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { createContext, useContext, useEffect, useState } from "react";
// import ThresholdKey from "@tkey/default";
import web3Obj from "./embedHelper";
// import TorusStorageLayer from "@tkey/storage-layer-torus";
// import TorusServiceProvider from "@tkey/service-provider-torus";
// import ServiceProviderBase from "@tkey/service-provider-base";
// import WebStorageModule, { WEB_STORAGE_MODULE_NAME } from "@tkey/web-storage";
// import ShareTransferModule, {
//   SHARE_TRANSFER_MODULE_NAME,
// } from "@tkey/share-transfer";
// import SecurityQuestionsModule, {
//   SECURITY_QUESTIONS_MODULE_NAME,
// } from "@tkey/security-questions";
//import {subkey} from "@toruslabs/openlogin-subkey";
// import { getAddress } from "./openLogin";
import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import HankyuNftMinter from "config/ABI/HankyuClaimNft.json";
// import HankyuNft from "config/ABI/HankyuNft.json"; // Nft Contract
// import HankyuOrderAbi from "config/ABI/HankyuOrderNft.json";
// import HankyuPreOrderMinterAbi from "config/ABI/HankyuPreorderMinter.json";
// const pathLocation = window.location.pathname;
const {
//   REACT_APP_LINE_VERIFIER,
//   REACT_APP_LINE_CLIENTID,
//   REACT_APP_LOGIN_DOMAIN,
  REACT_APP_GOERLI_RPC,
//   REACT_APP_TORUS_CLIENTID,
//   REACT_APP_POLYGON_PROVIDER,
//   REACT_APP_TORUS_NETWORK,

//   REACT_APP_HANKYU_NFT,
//   REACT_APP_HANKYU_PREORDER_NFT,
//   REACT_APP_HANKYU_CLAIM_MINTER_NFT,
//   REACT_APP_HANKYU_ORDER_MINTER_NFT,
//   REACT_APP_HANKYU_PREORDER_MINTER_NFT,
//   REACT_APP_HANKYU_SWAP_PREORDER_NFT,
//   REACT_APP_HANKYU_PAYMASTER_NFT,

  // EVENTID
//   REACT_APP_CLAIM_ID,
} = process.env;

// const LOGIN_CONNECTIONS = {
//   line: {
//     typeOfLogin: "line",
//     jwtParams: {
//       domain: REACT_APP_LOGIN_DOMAIN,
//       connection: "line",
//       clientId: REACT_APP_LINE_CLIENTID,
//       scope: "openid email profile offline_access",
//     },
//     verifier: REACT_APP_LINE_VERIFIER, // currently using 'upbond-rick-line'
//     clientId: REACT_APP_LINE_CLIENTID,
//   },
// };

export const CustomAuthContext = createContext({
  customAuth: null,
  provider: null,
  isLoading: false,
  user: null,
  result: null,
  chain: "",
  lineLogin: async () => {},
  logout: async () => {},
  getUser: async () => {},
  loginEmbed: async () => {},
  logoutEmbed: async () => {},
  getUserInfo: async () => {},
  acc: null,
});

export function useCustomAuth() {
  return useContext(CustomAuthContext);
}

export const CustomAuthProvider = ({ children, web3AuthNetwork, chain }) => {
//   const [customAuth, setCustomAuth] = useState(null);
  const [result, setResult] = useState(null);
  const [provider, setProvider] = useState(null);
  const [acc, setAcc] = useState(null);
  // const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

//   const [isOrder, setIsOrder] = useState(localStorage.getItem("urlParams"));
//   const [isPreOrder, setIsPreOrder] = useState(
//     localStorage.getItem("urlParamsPreOrder")
//   );
  //   useEffect(() => {
  //     const init = async () => {
  //       const serviceProvider = new TorusServiceProvider({
  //         directParams: {
  //           baseUrl: `${window.location.origin}`,
  //           enableLogging: false,
  //           redirectPathName: `auth`,
  //           uxMode: "redirect",

  //           //proxyContractAddress: "0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183", // details for test net
  //           network: REACT_APP_TORUS_NETWORK,
  //         },
  //       });
  //       setCustomAuth(serviceProvider);
  //     };
  //     init();
  //   }, []);
  useEffect(() => {
    const init = async () => {
      const { upbond, web3 } = web3Obj;
      await upbond.init({
        buildEnv: "direct-test",
        usingDirect: false,
        network: {
        //   host: "https://polygon-mumbai.infura.io/v3/74a97bae118345ecbadadaaeb1cf4a53", // mandatory
          host: REACT_APP_GOERLI_RPC, // mandatory
          chainId: 5, // optional
          networkName: "Goerli Network", // optional
        },
        dappRedirectUri: `${window.location.origin}/login`,
        enableLogging: true,
        showOnModal: true,
        showOnDesktop: true,
        showOnMobile: true,
        skipTKey: false,
        isUsingDirect: false,
      });

      if (upbond.isLoggedIn) {
        const _provider = upbond.provider;
        await web3.setProvider(_provider);
        const accounts = await web3.eth.getAccounts();
        setAcc(accounts[0]);
        return;
      }
    };
    init();
  }, [window.location, web3Obj.upbond]);

  // useEffect(() => {
  //   getUser();
  // }, [customAuth]);

  const loginEmbed = async () => {
    try {
      const { upbond, web3 } = web3Obj;

      const acc = await upbond.login();
      await web3.setProvider(upbond.provider);

      setAcc(acc[0]);
    } catch (error) {
      console.error(error, "caught in vue-app");
    }
  };

//   const getUser = async () => {
//     setTimeout(async () => {
//       const url = new URL(window.location.href);
//       const hash = url.hash.substring(1);
//       const queryParams = {};
//       url.searchParams.forEach((value, key) => {
//         queryParams[key] = value;
//       });

//       if (!customAuth) {
//         await reInitCustomAuth();
//       } else if (!hash && Object.keys(queryParams).length === 0) {
//         console.log("need login first");
//       } else {
//         try {
//           setIsLoading(true);
//           const loginDetails = await customAuth.directWeb.getRedirectResult({
//             replaceUrl: true,
//             clearLoginDetails: true,
//           });
//           console.log("loginDetails", loginDetails);
//           if (
//             loginDetails &&
//             loginDetails.result &&
//             loginDetails.result.userInfo
//           ) {
//             console.log("loginDetails.result", loginDetails.result);
//             console.log(
//               "loginDetails.result.userInfo",
//               loginDetails.result.userInfo
//             );
//             setResult(loginDetails);
//             const verifierId = loginDetails.result.userInfo.verifierId;
//             const serviceProvider = new ServiceProviderBase({
//               postboxKey: loginDetails?.result?.privateKey.padStart(64, "0"),
//             });
//             const storageLayer = new TorusStorageLayer({
//               hostUrl: "https://metadata.tor.us",
//               serviceProvider,
//             });
//             const tKey = new ThresholdKey({
//               serviceProvider,
//               storageLayer,
//               manualSync: true,
//               modules: {
//                 [WEB_STORAGE_MODULE_NAME]: new WebStorageModule(),
//                 [SHARE_TRANSFER_MODULE_NAME]: new ShareTransferModule(),
//                 [SECURITY_QUESTIONS_MODULE_NAME]: new SecurityQuestionsModule(),
//               },
//             });

//             const details = await tKey.initialize();

//             const privKey = await initializeAndReconstruct(
//               tKey,
//               details,
//               verifierId
//             );
//             const subKeyDerived = window.OpenloginSubkey.subkey(
//               privKey.padStart(64, "0"),
//               Buffer.from(REACT_APP_TORUS_CLIENTID, "base64")
//             );
//             localStorage.setItem("subkey", subKeyDerived.padStart(64, "0"));
//             if (privKey) {
//               const accessToken = loginDetails.result?.userInfo.accessToken;
//               const address = await getAddress();
//               localStorage.setItem("accesstoken", accessToken);
//               localStorage.setItem("walletaddress", address);
//               if (isOrder === "undefined" && isPreOrder === "undefined") {
//                 const EtherProvider = new ethers.providers.JsonRpcProvider(
//                   REACT_APP_POLYGON_PROVIDER
//                 );
//                 const getNumb = localStorage.getItem("subkey");
//                 const accounts = new ethers.Wallet(getNumb, EtherProvider); //privatekey
//                 const signer = EtherProvider.getSigner(accounts.address);

//                 const verifyEventId = REACT_APP_CLAIM_ID;
//                 localStorage.setItem("eventid", JSON.stringify(verifyEventId));
//                 const factory = new ethers.Contract(
//                   REACT_APP_HANKYU_CLAIM_MINTER_NFT,
//                   HankyuNftMinter,
//                   signer
//                 );
//                 const userHasClaimData = await factory.getUserAlreadyClaimEvent(
//                   accounts.address,
//                   verifyEventId
//                 ); // walet address, eventid
//                 localStorage.setItem("profile", JSON.stringify(true));
//                 localStorage.setItem("claim", JSON.stringify(userHasClaimData));
//                 localStorage.setItem("loading", false);
//                 history(`/claim`);
//                 return userHasClaimData;
//               } else if (isOrder !== "undefined") {
//                 const EtherProvider = new ethers.providers.JsonRpcProvider(
//                   REACT_APP_POLYGON_PROVIDER
//                 );
//                 const getNumb = localStorage.getItem("subkey");
//                 const accounts = new ethers.Wallet(getNumb, EtherProvider); //privatekey
//                 const signer = EtherProvider.getSigner(accounts.address);

//                 const factory = new ethers.Contract(
//                   REACT_APP_HANKYU_ORDER_MINTER_NFT,
//                   HankyuOrderAbi,
//                   accounts
//                 );
//                 const userHasClaimData = await factory.isUsedQr(isOrder); // walet address, eventid

//                 localStorage.setItem("profile", JSON.stringify(true));
//                 localStorage.setItem("claim", JSON.stringify(userHasClaimData));
//                 localStorage.setItem("loading", false);
//                 history(`/claim`);
//                 return userHasClaimData;
//                 // return false;
//               } else if (isPreOrder !== "undefined") {
//                 const EtherProvider = new ethers.providers.JsonRpcProvider(
//                   REACT_APP_POLYGON_PROVIDER
//                 );
//                 const getNumb = localStorage.getItem("subkey");
//                 const accounts = new ethers.Wallet(getNumb, EtherProvider); //privatekey
//                 const signer = EtherProvider.getSigner(accounts.address);

//                 const factory = new ethers.Contract(
//                   REACT_APP_HANKYU_PREORDER_MINTER_NFT,
//                   HankyuPreOrderMinterAbi,
//                   accounts
//                 );
//                 const userHasClaimData = await factory.isUsedQr(isPreOrder); // walet address, eventid
//                 console.log(userHasClaimData, "tet preorder");

//                 localStorage.setItem("profile", JSON.stringify(true));
//                 localStorage.setItem("claim", JSON.stringify(userHasClaimData));
//                 localStorage.setItem("loading", false);
//                 history(`/claim`);
//                 return userHasClaimData;
//                 // return false;
//               }
//               // if (userHasClaimData === true) {
//               // localStorage.setItem("loading", false);
//               // setIsLoading(false);
//               // history(`/list`);
//               // } else {
//               // setIsLoading(false);
//               // }
//             }
//           }
//         } catch (err) {
//           throw err;
//         }
//       }
//     }, 200);
//   };

//   const reInitCustomAuth = async () => {
//     try {
//       const serviceProvider = new TorusServiceProvider({
//         directParams: {
//           baseUrl: `${window.location.origin}`,
//           enableLogging: false,
//           redirectPathName: "login",
//           uxMode: "redirect",
//           redirectToOpener: true,
//           //proxyContractAddress: "0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183", // details for test net
//           network: REACT_APP_TORUS_NETWORK,
//         },
//       });

//       setCustomAuth(serviceProvider);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const login = async () => {
//     if (!customAuth) {
//       console.log("customauth not initialized yet");
//       await reInitCustomAuth();
//     }
//     localStorage.setItem("loading", true);
//     await customAuth.directWeb.init({ skipSw: true });
//     const loginConnections = LOGIN_CONNECTIONS["line"];
//     customAuth.directWeb.triggerLogin(loginConnections);
//   };

//   const initializeAndReconstruct = async (
//     torusKey,
//     initializedDetails,
//     sub
//   ) => {
//     let tKey;
//     let requiredShares = initializedDetails.requiredShares;
//     let totalShares = initializedDetails.totalShares;
//     try {
//       let shareDesc = Object.assign({}, initializedDetails.shareDescriptions);
//       Object.keys(shareDesc).map((el) => {
//         shareDesc[el] = shareDesc[el].map((jl) => {
//           return JSON.parse(jl);
//         });
//       });
//       let priorityOrder = ["webStorage", "securityQuestions"];
//       let tempSD = Object.values(shareDesc)
//         .flatMap((x) => x)
//         .sort((a, b) => {
//           return (
//             priorityOrder.indexOf(a.module) - priorityOrder.indexOf(b.module)
//           );
//         });
//       if (tempSD.length === 0 && requiredShares > 0) {
//         throw new Error(
//           "No share descriptions available. New key assign might be required or contact support"
//         );
//       }
//       while (requiredShares > 0 && tempSD.length > 0) {
//         let currentPriority = tempSD.shift();
//         console.log(currentPriority);
//         if (currentPriority.module === "webStorage") {
//           try {
//             await torusKey.modules.webStorage.inputShareFromWebStorage();
//             requiredShares--;
//           } catch (err) {
//             console.log("Couldn't find on device share");
//           }
//         } else if (currentPriority.module === "securityQuestions") {
//           await torusKey.modules.securityQuestions.inputShareFromSecurityQuestions(
//             sub,
//             "mypassword?"
//           );
//           // default to password for now
//           //let password = prompt("Please enter your password", "");
//           console.log(sub);
//           if (sub != null) {
//           }
//         }
//       }
//       tKey = await torusKey.reconstructKey();
//       if (totalShares <= 2) {
//         //let password = prompt("Please enter password to login other devices", "");
//         if (sub != null) {
//           await torusKey.modules.securityQuestions.generateNewShareWithSecurityQuestions(
//             sub,
//             "mypassword?"
//           );
//           //tKey = await this.tKey.reconstructKey(false);
//         }
//       }
//       await torusKey.syncLocalMetadataTransitions();
//     } catch (err) {
//       console.log(err);
//       await torusKey.updateSDK();
//     }

//     return tKey.privKey.toString("hex");
//   };

  const logout = async () => {
    //await customAuth.logout()
    await web3Obj.upbond.logout();
    await web3Obj.upbond.cleanUp();
    setResult(null);
    setProvider(null);
    localStorage.clear();
    // window.location.reload();
    // history("/");
  };

  const contextProvider = {
    // customAuth,
    chain,
    // isLoading,
    provider,
    loginEmbed,
    logout,
    result,
    // getUser,
    acc
  };

  return (
    <CustomAuthContext.Provider value={contextProvider}>
      {children}
    </CustomAuthContext.Provider>
  );
};
