import { AppBar, Toolbar, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <div id="desktop-header">
      <AppBar position="static">
        <Toolbar sx={{ gap: 4 }}>
          <img alt="Skafis logo" src="/favicon-32x32.png" />
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Skafis
          </Typography>
          <h3>
            <a href="https://www.vbesort.lt" style={{ color: "white" }}>
              Surūšiuotos egzaminų užduotys <OpenInNewIcon />
            </a>
          </h3>
          <h3>
            <a href="https://bankas.skafis.lt" style={{ color: "white" }}>
              Užduočių bankas <OpenInNewIcon />
            </a>
          </h3>
          <h3>
            <a href="https://testai.skafis.lt" style={{ color: "white" }}>
              Testavimo platforma <OpenInNewIcon />
            </a>
          </h3>
          <h3>
            <a href="/about" style={{ color: "white" }}>
              Apie
            </a>
          </h3>
          {isLoggedIn ? (
            <h3>
              <a
                href="https://bankas.skafis.lt/logout?redirect=https://www.skafis.lt"
                style={{ color: "white" }}
              >
                Atsijungti
              </a>
            </h3>
          ) : (
            <h3>
              <a
                href="https://bankas.skafis.lt/login?redirect=https://www.skafis.lt"
                style={{ color: "white" }}
              >
                Prisijungti
              </a>
            </h3>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
