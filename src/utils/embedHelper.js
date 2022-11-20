import Web3 from "web3";
import Upbond from "@upbond/upbond-embed";

const web3Obj = {
  web3: new Web3(),
  upbond: new Upbond()
};

export default web3Obj;
