import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import UserData from "./pages/UserData";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/add" element={<AddUser />} />
          <Route exact path="/user/edit/:id" element={<AddUser />} />
          <Route exact path="/user/data/:id" element={<UserData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
