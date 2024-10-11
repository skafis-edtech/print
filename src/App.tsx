import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./routes/MainPage";
import AboutPage from "./routes/AboutPage";
import { AuthProvider } from "./context/AuthContext";
import CookiesAlert from "./components/CookiesAlert";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
        <CookiesAlert />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
