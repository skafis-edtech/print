import { TextField } from "@mui/material";

const ProblemEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField
      label="Užduoties tekstas"
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
    />
  );
};
export default ProblemEditor;
