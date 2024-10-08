import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface NewSkfListProps {
  fetchSkfAndAdd: (skfCode: string) => Promise<void>;
  setProblems: (value: { skfCode: string; content: string }[]) => void;
  problems: { skfCode: string; content: string }[];
}

const NewSkfList: React.FC<NewSkfListProps> = ({
  fetchSkfAndAdd,
  setProblems,
  problems,
}) => {
  const [skfListInput, setSkfListInput] = useState<string>("");

  useEffect(() => {
    const parsedSkfList = parseQueryParams();
    if (parsedSkfList) {
      setSkfListInput(parsedSkfList);
    }
  }, []);
  const handleProcessSkfCodes = async () => {
    const skfCodes = skfListInput.split(" ");
    const skfRegex = /^SKF-\d+$/;

    for (const skfCode of skfCodes) {
      if (skfRegex.test(skfCode)) {
        await fetchSkfAndAdd(skfCode);
      } else {
        setProblems([
          ...problems,
          {
            skfCode: "",
            content: `❗SKF kodas "${skfCode}" neatitinka formato SKF-<sveikas-skaičius>.❗`,
          },
        ]);
      }
    }
  };

  const parseQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const skfList = searchParams.get("skflist");
    if (skfList) {
      return skfList
        .split(" ")
        .map((num) => `SKF-${num}`)
        .join(" ");
    }
    return "";
  };
  return (
    <Box sx={{ p: 2, mt: 2, border: "1px solid black" }}>
      <TextField
        label="SKF kodų sąrašas"
        variant="outlined"
        fullWidth
        value={skfListInput}
        onChange={(e) => setSkfListInput(e.target.value)}
        helperText="Įveskite SKF kodus atskirtus tarpais, pvz., 'SKF-1 SKF-125 SKF-121'. Sąrašą susikurkite užduočių banko puslapyje."
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleProcessSkfCodes}
          sx={{ mt: 2 }}
        >
          Pridėti visus į sąrašą
        </Button>
      </Box>
    </Box>
  );
};

export default NewSkfList;
