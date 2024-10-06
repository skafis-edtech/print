import { Box, Button, Typography } from "@mui/material";
import ProblemEditor from "../components/ProblemEditor";
import ProblemDisplay from "../components/ProblemDisplay";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

function MainPage() {
  const [problems, setProblems] = useState<string[]>(() => {
    const savedProblems = localStorage.getItem("problems");
    return savedProblems
      ? JSON.parse(savedProblems)
      : ["Pavyzdys 1", "Pavyzdys 2"];
  });

  const [newProblem, setNewProblem] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("problems", JSON.stringify(problems));
  }, [problems]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(problems[index]);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedProblems = [...problems];
      updatedProblems[editIndex] = editValue;
      setProblems(updatedProblems);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleAddProblem = () => {
    if (newProblem.trim()) {
      setProblems([...problems, newProblem]);
      setNewProblem("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedProblems = problems.filter((_, i) => i !== index);
    setProblems(updatedProblems);
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

  return (
    <>
      <header>
        <img alt="Skafis logo" src="/favicon-32x32.png" />
        <span>Skafis</span>
      </header>
      <main>
        <aside></aside>
        <section>
          <div className="no-print">
            <h1>Skafis</h1>
            <p>Paprasti švietimo technologijų sprendimai</p>
            <p>
              Surūšiuotos egzaminų užduotys:{" "}
              <a href="https://www.vbesort.lt">https://www.vbesort.lt</a>
            </p>
            <p>
              Užduočių bankas:{" "}
              <a href="https://bankas.skafis.lt">https://bankas.skafis.lt</a>
            </p>
            <p>
              Testavimo platforma:{" "}
              <a href="https://bankas.skafis.lt">https://testai.skafis.lt</a>
            </p>
            <h2>Testų PDF kūrimas</h2>
            <p>Progresas automatiškai išsaugomas Jūsų naršyklėje</p>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 1,
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  const dataStr =
                    "data:text/json;charset=utf-8," +
                    encodeURIComponent(JSON.stringify(problems));
                  const downloadAnchorNode = document.createElement("a");
                  downloadAnchorNode.setAttribute("href", dataStr);
                  downloadAnchorNode.setAttribute("download", "problems.json");
                  document.body.appendChild(downloadAnchorNode); // required for firefox
                  downloadAnchorNode.click();
                  downloadAnchorNode.remove();
                }}
                sx={{ mt: 2, ml: 2 }}
              >
                Atsisiųsti užduočių redagavimo failą (.json)
              </Button>
              <input
                type="file"
                accept=".json"
                id="upload-problems"
                style={{ display: "none" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const fileReader = new FileReader();
                  if (e.target.files && e.target.files.length > 0) {
                    fileReader.readAsText(e.target.files[0], "UTF-8");
                    fileReader.onload = (e) => {
                      if (e.target && typeof e.target.result === "string") {
                        const uploadedProblems = JSON.parse(e.target.result);
                        setProblems(uploadedProblems);
                      }
                    };
                  }
                }}
              />

              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  const fileInput = document.getElementById("upload-problems");
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
                sx={{ mt: 2, ml: 2 }}
              >
                Įkelti užduočių redagavimo failą (.json)
              </Button>
            </Box>
          </div>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="problems">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {problems.map((problem, index) => (
                    <Draggable
                      key={index}
                      draggableId={`problem-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            border: "1px solid black",
                            p: 2,
                            mb: 2,
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                          }}
                        >
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="h6">{index + 1}.</Typography>
                            {editIndex === index ? (
                              <>
                                <ProblemEditor
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                />
                                <div className="no-print">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      mt: 1,
                                    }}
                                  >
                                    <Button
                                      color="error"
                                      onClick={handleCancel}
                                    >
                                      Atšaukti
                                    </Button>
                                    <Button
                                      color="info"
                                      variant="contained"
                                      onClick={handleSave}
                                      sx={{ ml: 1 }}
                                    >
                                      Išsaugoti
                                    </Button>
                                  </Box>
                                </div>
                              </>
                            ) : (
                              <>
                                <ProblemDisplay value={problem} />
                                <div className="no-print">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      mt: 1,
                                    }}
                                  >
                                    <Button
                                      color="error"
                                      variant="contained"
                                      onClick={() => handleDelete(index)}
                                    >
                                      Ištrinti
                                    </Button>
                                    <Button
                                      color="warning"
                                      variant="contained"
                                      onClick={() => handleEdit(index)}
                                      sx={{ ml: 1 }}
                                    >
                                      Redaguoti
                                    </Button>
                                  </Box>
                                </div>
                              </>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="no-print">
            <Box sx={{ p: 3 }}>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Naujos užduoties turinys</Typography>
                <ProblemEditor
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 1,
                  }}
                >
                  <Button
                    color="success"
                    variant="contained"
                    onClick={handleAddProblem}
                    sx={{ mt: 2 }}
                  >
                    Pridėti užduotį
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                mt: 1,
              }}
            >
              <Button variant="contained" onClick={() => window.print()}>
                Atsisiųsti (spausdinti) PDF
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
          </div>
        </section>
        <aside></aside>
      </main>
      <footer>
        <p>(c) MB Skafis 2024</p>
        <p>v2.0.0 - Paskutinį kartą atnaujinta 2024-10-06</p>
      </footer>
    </>
  );
}

export default MainPage;
