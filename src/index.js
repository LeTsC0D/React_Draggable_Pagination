
import { createRoot } from "react-dom/client";

import App from "./App";
import Allcoins from "./Allcoins";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link ,
} from "react-router-dom";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>


      <Routes>
    <Route path="/" element={<App />}></Route>
  </Routes>

  <Routes>
    <Route path="/allcoins" element={<Allcoins />}></Route>
  </Routes>
</Router>

    

);