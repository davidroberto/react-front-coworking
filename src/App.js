import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage";
import CoworkingsPage from "./page/CoworkingsPage";
import CoworkingDetailsPage from "./page/CoworkingDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coworkings" element={<CoworkingsPage />} />
        <Route path="/coworking/details/:id" element={<CoworkingDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
