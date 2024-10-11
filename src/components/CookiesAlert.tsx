import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";

const CookiesAlert: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    return savedConsent ? JSON.parse(savedConsent) : false;
  });

  const handleAcceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem("cookieConsent", JSON.stringify(true));
  };

  return (
    <div className="no-print">
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
    </div>
  );
};
export default CookiesAlert;
