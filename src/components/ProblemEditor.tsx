import { TextField } from "@mui/material";

const ProblemEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField value={value} onChange={onChange} variant="outlined" fullWidth />
  );
};
export default ProblemEditor;
