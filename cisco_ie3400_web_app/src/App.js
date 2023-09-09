import {HashRouter , Navigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import Cisco from "./cisco";

function App() {
  return (
        <HashRouter>
                  <div className="container">
                    <Routes>
                      <Route path="/cisco/*" element={<Cisco />}/>
                    </Routes>
                  </div>
        </HashRouter>
  );
}

export default App;
