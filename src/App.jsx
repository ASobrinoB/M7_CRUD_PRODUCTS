import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import ProductState from "./contexts/products/ProductState";

function App() {
  return (
      <ProductState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ProductState>
  );
}

export default App;
