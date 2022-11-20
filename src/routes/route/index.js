import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Mint from "../../pages/mint";
// import ClaimNft from "pages/claim";
// import RouteChecker from "routes/routeChecker";
// import Auth from "pages/auth";
// import ListNft from "pages/list";

function MainRoute() {
  return (
    // <RouteChecker>
      <Routes>
        <Route path={`/`} element={<Mint />} />
        <Route path={`/login`} element={<div>Halo dari login</div>} />
        {/* <Route
          path={`/${hash}/login`}
          elem ent={<OrderRoute component={<OnBoarding />} />}
        /> */}
        {/* <Route path={`/order/:id/login`} element={<OnBoarding />} />
        <Route path={`/preorder/:id/login`} element={<OnBoarding />} />
        <Route path={`/claim`} element={<ClaimNft />} />
        <Route path={`/auth`} element={<Auth />} />
        <Route path={`/list`} element={<ListNft />} /> */}
      </Routes>
    // </RouteChecker>
  );
}

export default MainRoute;
