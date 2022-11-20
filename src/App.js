import logo from "./logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { CustomAuthProvider } from "./utils/customAuth";
import MainRoute from "./routes/route";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="uk-container main-container">
        <CustomAuthProvider chain="polygon" web3AuthNetwork="testnet">
          <MainRoute />
        </CustomAuthProvider>
      </div>
    </Router>
  );
}

export default App;
