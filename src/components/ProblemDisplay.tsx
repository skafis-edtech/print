import { Box, Button, Typography } from "@mui/material";
import ContentEditor from "./ContentEditor";
import ContentDisplay from "./ContentDisplay";

interface ProblemDisplayProps {
  index: number;
  isEditable: boolean;
  problem: string;
  editValue: string;
  setEditValue: (value: string) => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleDelete: (index: number) => void;
  handleEdit: (index: number) => void;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({
  index,
  isEditable,
  problem,
  editValue,
  setEditValue,
  handleCancel,
  handleSave,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">{index + 1}.</Typography>
      {isEditable ? (
        <>
          <ContentEditor
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
              <Button color="error" onClick={handleCancel}>
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
          <ContentDisplay value={problem} />
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
  );
};
export default ProblemDisplay;
