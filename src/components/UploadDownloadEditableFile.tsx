import { Box, Button } from "@mui/material";

interface UploadDownloadEditableFileProps {
  problems: any;
  setProblems: (problems: any) => void;
}

const UploadDownloadEditableFile: React.FC<UploadDownloadEditableFileProps> = ({
  problems,
  setProblems,
}) => {
  return (
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
          downloadAnchorNode.setAttribute(
            "download",
            `skafis-uzduotys-${new Date().toISOString()}.json`
          );
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
  );
};

export default UploadDownloadEditableFile;
