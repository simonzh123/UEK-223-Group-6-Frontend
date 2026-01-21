import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { List, Importance } from "../../types/models/List.model";
import { useState } from "react";

type ListEntryProps = {
  list: List;
  handleDelete: (id: string) => Promise<void>;
  handleEdit: (id: string) => void;
};

const ListEntry = ({ list, handleDelete, handleEdit }: ListEntryProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteChange = () => {
    setIsDeleting(!isDeleting);
  };

  return (
      <Card sx={{minWidth: 275}}>
        <CardContent sx={{borderBottom: "1px solid"}}>
          Author: {list.user.firstName} {list.user.lastName} <br/>
          Priority: {Importance[list.importance]} <br/> {list.title} <br/>
          -------------------------------------- <br/>
          {list.text}
          <br/>
          <br/>
          <CardActions>
            {isDeleting ? (
                <>
                  <Button
                      size="small"
                      color="info"
                      variant="contained"
                      onClick={() => handleDeleteChange()}
                  >
                    Cancel
                  </Button>
                  <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={async () => await handleDelete(list.id)}
                  >
                    Confirm Delete
                  </Button>
                </>
            ) : (
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleDeleteChange()}
                >
                  Delete
                </Button>
            )}
            <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => handleEdit(list.id)}
            >
              Edit
            </Button>
          </CardActions>
        </CardContent>
      </Card>
  );
};

export default ListEntry;
