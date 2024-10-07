import { Alert, Box, Button, Typography } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import NewProblem from "../components/NewProblem";
import NewSkfList from "../components/NewSkfList";
import UploadDownloadEditableFile from "../components/UploadDownloadEditableFile";
import ProblemList from "../components/ProblemList";

function MainPage() {
  const [problems, setProblems] = useState<string[]>(() => {
    const savedProblems = localStorage.getItem("problems");
    return savedProblems ? JSON.parse(savedProblems) : ["Pavyzdinė užduotis"];
  });

  const [newProblem, setNewProblem] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("problems", JSON.stringify(problems));
  }, [problems]);

  const handleAddProblem = () => {
    if (newProblem.trim()) {
      setProblems([...problems, newProblem]);
      setNewProblem("");
    }
  };

  const handleRemoveAllProblems = () => {
    setProblems([]);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(problems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProblems(items);
  };

  const fetchSkfAndAdd = async (skfCode: string) => {
    const response = await fetch(
      `https://api2.skafis.com/view/problem/${skfCode}`
    );
    const data = await response.json();
    let toAdd = "";

    if (data.problemVisibility === "VISIBLE") {
      toAdd = data.problemText;
    } else if (data.problemVisibility === "HIDDEN") {
      toAdd = `❗Užduotis "${skfCode}" yra paslėpta. Norėdami matyti užduotį, turite prisijungti arba pakeisti paskyrą.❗`;
    } else {
      toAdd = `❗Užduotis "${skfCode}" neegzistuoja arba įvyko kita klaida.❗`;
    }

    setProblems((prevProblems) => [...prevProblems, toAdd]);
  };

  const renderedProblems = useMemo(() => {
    return (
      <ProblemList
        {...{
          problems,
          setProblems,
          handleOnDragEnd,
        }}
      />
    );
  }, [problems]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <aside></aside>
        <section>
          <div className="no-print">
            <div style={{ textAlign: "right", marginTop: 2 }}>
              <a href="#bottom">⬇️ Eiti į apačią ⬇️</a>
            </div>
            <Typography
              variant="h1"
              sx={{ textAlign: "center", fontSize: "60px" }}
            >
              Skafis
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              <em>Paprasti švietimo technologijų sprendimai</em>
            </Typography>
            <Typography variant="h3" sx={{ textAlign: "center", my: 4 }}>
              Šiame tinklapyje galite kurti užduočių sąrašą atsispausdinimui
              (PDF). Rašykite savo arba įkelkite iš užduočių banko.
            </Typography>
            <Alert variant="outlined" severity="info">
              Progresas automatiškai išsaugomas Jūsų naršyklėje
            </Alert>

            <UploadDownloadEditableFile {...{ problems, setProblems }} />
          </div>

          {renderedProblems}

          <div className="no-print" id="bottom">
            <NewProblem
              {...{
                newProblem,
                setNewProblem,
                handleAddProblem,
              }}
            />
            <div id="skflist"></div>
            <NewSkfList
              {...{
                fetchSkfAndAdd,
                setProblems,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                mt: 1,
              }}
            >
              <Button variant="contained" onClick={() => window.print()}>
                Atsisiųsti / spausdinti (.pdf)
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button color="error" onClick={handleRemoveAllProblems}>
                Išvalyti viską
              </Button>
            </Box>

            <p>SKF užduoties rėmelio spalvos:</p>
            <p>Balta - nepanaudota</p>
            <p>Žalia - sėkmingai įkelta</p>
            <p>
              Geltona - egzistuoja, bet yra neprieinama (reikia prisijungti arba
              naudoti kitą paskyrą)
            </p>
            <p>Raudona - užduotis neegzistuoja arba įvyko kita klaida</p>
            <div style={{ textAlign: "right", marginTop: 2 }}>
              <a href="#">⬆️ Grįžti į viršų ⬆️</a>
            </div>
          </div>
        </section>
        <aside></aside>
      </main>
      <footer>
        <p>© MB Skafis 2024</p>
        <p>Įmonės kodas 306971704</p>
        <p>
          Susisiekite <a href="mailto:info@skafis.lt">info@skafis.lt</a>
        </p>
        <p>v2.0.0 - Paskutinį kartą atnaujinta 2024-10-07</p>
      </footer>
    </>
  );
}

export default MainPage;
