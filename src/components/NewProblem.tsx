import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import ContentEditor from "./ContentEditor";
import { fetchSkf } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface NewProblemProps {
  newProblem: { skfCode: string; content: string };
  setNewProblem: (value: { skfCode: string; content: string }) => void;
  handleAddProblem: () => void;
}

const NewProblem: React.FC<NewProblemProps> = ({
  newProblem,
  setNewProblem,
  handleAddProblem,
}) => {
  const [skfValue, setSkfValue] = useState<string>("SKF-");
  const [skfStatusColor, setSkfStatusColor] = useState<string>("white");
  const { jwt } = useAuth();

  const fetchSkfProblem = async () => {
    const { toAdd, visibility } = await fetchSkf(skfValue, jwt);
    setNewProblem({ skfCode: skfValue, content: toAdd });
    setSkfStatusColor(
      visibility === "VISIBLE"
        ? "green"
        : visibility === "HIDDEN"
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
          value={newProblem.content}
          onChange={(e) =>
            setNewProblem({ ...newProblem, content: e.target.value })
          }
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
