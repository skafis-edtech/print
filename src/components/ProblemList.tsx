import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box, Button, Typography } from "@mui/material";
import ContentEditor from "./ContentEditor";
import ContentDisplay from "./ContentDisplay";
import { useState } from "react";

interface ProblemListProps {
  problems: string[];
  handleOnDragEnd: (result: any) => void;
  setProblems: (value: string[]) => void;
}

const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  handleOnDragEnd,
  setProblems,
}) => {
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

  const handleDelete = (index: number) => {
    const updatedProblems = problems.filter((_, i) => i !== index);
    setProblems(updatedProblems);
  };
  return (
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
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProblemList;
