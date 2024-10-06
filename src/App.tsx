import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./routes/MainPage";
import { Snackbar, Alert, Button } from "@mui/material";
import AboutPage from "./routes/AboutPage";

function App() {
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    return savedConsent ? JSON.parse(savedConsent) : false;
  });

  const handleAcceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem("cookieConsent", JSON.stringify(true)); // Save the consent in localStorage
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>

      {!cookieConsent && (
        <Snackbar
          open={!cookieConsent}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ width: "100%", height: "auto" }}
        >
          <Alert
            severity="info"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleAcceptCookies}
              >
                Supratau
              </Button>
            }
          >
            Šis tinklapis naudoja Google Analytics slapukus bei Jūsų kompiuterio
            atmintį. Tęsdami lankymąsi puslapyje Jūs sutinkate su slapukų bei
            kompiuterio atminties naudojimu. Plačiau puslapyje{" "}
            <a href="/about#terms">"Apie" skiltyje "Privatumo politika"</a>.
          </Alert>
        </Snackbar>
      )}
    </BrowserRouter>
  );
}

export default App;
