import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 4 }}>
        <img alt="Skafis logo" src="/favicon-32x32.png" />
        <Typography variant="h2" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          Skafis
        </Typography>
        <h3>
          <a href="https://www.vbesort.lt" style={{ color: "white" }}>
            {" "}
            Surūšiuotos egzaminų užduotys{" "}
            <svg
              width="13.5"
              height="13.5"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="iconExternalLink_nPIU"
            >
              <path
                fill="currentColor"
                d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
              ></path>
            </svg>
          </a>
        </h3>
        <h3>
          <a href="https://bankas.skafis.lt" style={{ color: "white" }}>
            Užduočių bankas{" "}
            <svg
              width="13.5"
              height="13.5"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="iconExternalLink_nPIU"
            >
              <path
                fill="currentColor"
                d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
              ></path>
            </svg>
          </a>{" "}
        </h3>
        <h3>
          <a href="https://testai.skafis.lt" style={{ color: "white" }}>
            Testavimo platforma{" "}
            <svg
              width="13.5"
              height="13.5"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="iconExternalLink_nPIU"
            >
              <path
                fill="currentColor"
                d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
              ></path>
            </svg>
          </a>
        </h3>
        <h3>
          <a href="/about" style={{ color: "white" }}>
            Apie
          </a>
        </h3>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
