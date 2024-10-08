import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProblemDisplay from "./ProblemDisplay";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface ProblemListProps {
  problems: { skfCode: string; content: string }[];
  handleOnDragEnd: (result: any) => void;
  setProblems: (value: { skfCode: string; content: string }[]) => void;
}

const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  handleOnDragEnd,
  setProblems,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("-");
  const [wasEpmtied, setWasEpmtied] = useState<boolean>(false);

  useEffect(() => {
    if (editValue === "") {
      setWasEpmtied(true);
    }
  }, [editValue]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(problems[index].content);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedProblems = [...problems];
      updatedProblems[editIndex].content = editValue;
      updatedProblems[editIndex].skfCode = wasEpmtied
        ? ""
        : problems[editIndex].skfCode;
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
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", right: 8, top: 10 }}>
                      <DragIndicatorIcon />
                    </div>
                    <ProblemDisplay
                      skfCode={problem.skfCode}
                      index={index}
                      isEditable={editIndex === index}
                      problem={problem.content}
                      editValue={editValue}
                      setEditValue={setEditValue}
                      handleCancel={handleCancel}
                      handleSave={handleSave}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
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
