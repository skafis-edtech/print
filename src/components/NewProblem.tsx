import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ContentEditor from "./ContentEditor";

interface NewProblemProps {
  newProblem: string;
  setNewProblem: (value: string) => void;
  handleAddProblem: () => void;
}

const NewProblem: React.FC<NewProblemProps> = ({
  newProblem,
  setNewProblem,
  handleAddProblem,
}) => {
  const [skfValue, setSkfValue] = useState<string>("SKF-");
  const [skfStatusColor, setSkfStatusColor] = useState<string>("white");
  const fetchSkfProblem = async () => {
    const response = await fetch(
      `https://api2.skafis.com/view/problem/${skfValue}`
    );
    const data = await response.json();
    setNewProblem(data.problemText);
    setSkfStatusColor(
      data.problemVisibility === "VISIBLE"
        ? "green"
        : data.problemVisibility === "HIDDEN"
        ? "yellow"
        : "red"
    );
  };

  return (
    <Box sx={{ p: 2, border: "1px solid black" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "center",
            mb: 1,
          }}
        >
          <div
            style={{
              border: `2px solid ${skfStatusColor}`,
              display: "flex",
              gap: 10,
              padding: 10,
            }}
          >
            <div>
              <p>
                <a href="https://bankas.skafis.lt">Užduočių banko</a> užduotis:
              </p>
            </div>
            <TextField
              label="SKF kodas"
              value={skfValue}
              onChange={(e) => setSkfValue(e.target.value)}
              sx={{ width: "100px" }}
            />
            <Button
              color="info"
              variant="contained"
              onClick={fetchSkfProblem}
              sx={{ mt: 2 }}
            >
              Įkelti
            </Button>
          </div>
        </Box>
        <ContentEditor
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
  );
};

export default NewProblem;
