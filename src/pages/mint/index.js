import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Modal, Box, Typography, Grid, TextField } from "@mui/material";
import { useCustomAuth } from "utils/customAuth";
import { useMetaMask } from "metamask-react";
import { metamaskIcon, upbondIcon, userIcon } from "assets";
import { minting } from "utils/mint";

function Mint() {
  const { logout, loginEmbed, acc } = useCustomAuth();
  const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();

  const [open, setOpen] = useState(false);
  const [theAccount, setTheAccount] = useState(account);
  const [noMetamask, setNoMetamask] = useState(null);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentChain, setCurrentChain] = useState(null);

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const loginMetamask = async () => {
    const getData = await connect();
    setOpen(false);
    // const verifyEventId = process.env.REACT_APP_CLAIM_ID;
    // localStorage.setItem("eventid", JSON.stringify(verifyEventId));
    if (getData !== null) {
      localStorage.setItem("walletaddress", getData[0]);
      localStorage.setItem("ismetamask", true);
      setCurrentWallet("metamask");
    }
  };

  useEffect(() => {
    const isMetaMask = isMetaMaskInstalled();
    setNoMetamask(isMetaMask);
  }, [noMetamask]);

  useEffect(() => {
    console.log(account, "@account");
  }, [account]);

  useEffect(() => {
    console.log(chainId, "@chainId");
    setCurrentChain(chainId);
  }, [chainId]);

  useEffect(() => {
    console.log(status, "@status");
    if (status === "connected") {
      setTheAccount(account);
    }
  }, [status]);

  console.log(acc, "@35");
  console.log(currentWallet, "@cw");

  return (
    <>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Box
          sx={{ height: "8%", display: "flex", borderBottom: "2px solid grey" }}
        >
          <img
            width="48px"
            height="48px"
            src={upbondIcon}
            alt="upbond logo"
            srcset=""
          />
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            ASOBI
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            width: "100%",
            height: "91.5%",
            flexWrap: "wrap",
          }}
        >
          <Grid
            // xs={12}
            // md={6}
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            <img src={userIcon} alt="" srcset="" />
            <Typography>Bueno Tutorial</Typography>
            <Typography>Created by User</Typography>
          </Grid>
          <Grid
            // xs={12}
            // md={6}
            sx={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "url('https://images.unsplash.com/photo-1622042795081-c27996872dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JlZW4lMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80')",
            }}
          >
            <Box
              sx={{
                padding: "1.5rem 1rem",
                backgroundColor: "white",
                borderRadius: "10px",
                width: "70%",
                height: "30%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              {currentChain === "0x5" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "27%",
                    }}
                  >
                    <Typography>Wallet</Typography>
                    {acc && currentWallet === "upbond" ? (
                      <Button
                        sx={{
                          ":hover": {
                            backgroundColor: "rgba( 199, 202, 203, 1)",
                          },
                          borderRadius: "30px",
                          border: "1px solid grey",
                        }}
                        onClick={() => {
                          logout();
                          setCurrentWallet(null);
                        }}
                        className="button"
                      >
                        {acc.replace(acc.substring(5, acc.length - 3), "...")}
                        <i
                          style={{ marginLeft: ".75rem" }}
                          class="fa-solid fa-xmark"
                        ></i>
                      </Button>
                    ) : theAccount && currentWallet === "metamask" ? (
                      <Button
                        sx={{
                          ":hover": {
                            backgroundColor: "rgba( 199, 202, 203, 1)",
                          },
                          borderRadius: "30px",
                          border: "1px solid grey",
                        }}
                        onClick={() => {
                          setTheAccount(false);
                          setCurrentWallet(null);
                        }}
                        className="button"
                      >
                        {theAccount.replace(
                          theAccount.substring(5, theAccount.length - 3),
                          "..."
                        )}
                        <i
                          style={{ marginLeft: ".75rem" }}
                          class="fa-solid fa-xmark"
                        ></i>
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          ":hover": {
                            backgroundColor: "rgba( 199, 202, 203, 1)",
                          },
                          borderRadius: "30px",
                          border: "1px solid grey",
                        }}
                        onClick={() => setOpen(true)}
                        className="button"
                      >
                        Connect Wallet
                      </Button>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ width: "30%" }}>Quantity</Typography>
                    <Box
                      sx={{
                        width: "50%",
                        display: "flex",
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        sx={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "30%",
                          color: "black",
                        }}
                        centerRipple={true}
                        onClick={() => {
                          if (quantity > 1) setQuantity(quantity - 1);
                        }}
                      >
                        <i class="fa-solid fa-minus icon-quantity"></i>
                      </Button>
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "30%",
                        }}
                      >
                        <TextField
                          // type="number"
                          value={quantity}
                          size="small"
                          // sx={{
                          //   width: "100%",
                          //   // height: "2rem"
                          // }}
                          InputProps={{
                            inputProps: {
                              min: 1,
                              style: { textAlign: "center" },
                            },
                          }}
                          onChange={(e) => {
                            const numOnly = /^(\s*|\d+)$/;
                            if (numOnly.test(e.target.value)) {
                              if (
                                (e.target.value.length > 0 &&
                                  e.target.value > 0) ||
                                (e.target.value.length === 0 &&
                                  e.target.value !== 0)
                              ) {
                                console.log(
                                  "bener number",
                                  e.target.value.length
                                );
                                setQuantity(e.target.value);
                              }
                            }
                          }}
                        />
                      </Box>
                      <Button
                        sx={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "30%",
                          color: "black",
                        }}
                        centerRipple={true}
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                      >
                        <i class="fa-solid fa-plus icon-quantity"></i>
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "27%",
                      width: "100%",
                    }}
                  >
                    {(acc || theAccount) && currentWallet ? (
                      <Button
                        sx={{
                          border: "1px solid grey",
                          borderRadius: "30px",
                          width: "100%",
                          ":hover": {
                            backgroundColor: "rgba( 199, 202, 203, 1)",
                          },
                        }}
                        className="button"
                        onClick={() => {
                          if (currentWallet === "upbond") minting(acc, quantity);
                          if (currentWallet === "metamask") minting(account, quantity);
                        }}
                      >
                        Mint
                      </Button>
                    ) : (
                      <Button
                        disabled
                        sx={{
                          border: "1px solid grey",
                          borderRadius: "30px",
                          width: "100%",
                          ":hover": {
                            backgroundColor: "rgba( 199, 202, 203, 1)",
                          },
                        }}
                        className="button"
                      >
                        Please connect wallet first
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <span>
                    Please switch your network to Goerli 
                    <Button sx={{ border: "1px solid blue", marginLeft: ".5rem" }} onClick={() => {
                      switchChain("0x5")
                      setCurrentWallet("metamask")
                    }}>Switch to Goerli</Button>
                  </span>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            // padding: "5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              width: "50%",
              height: "50%",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <img
                // className="mx-auto"
                width="45%"
                src={upbondIcon}
                alt="upbond icon"
              />
              <button
                type="button"
                // className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                onClick={async () => {
                  await loginEmbed();
                  setOpen(false);
                  setCurrentWallet("upbond");
                }}
              >
                Upbond Wallet
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <img
                // className="mx-auto"
                src={metamaskIcon}
                alt="metamask icon"
                width="95%"
              />
              {noMetamask === false ? (
                <a
                  // className="flex justify-center text-indigo-400"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Metamaskをインストールして下さい。
                </a>
              ) : (
                <button
                  type="button"
                  // className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:mt-0 sm:text-sm"
                  onClick={loginMetamask}
                >
                  Metamask
                </button>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Mint;
