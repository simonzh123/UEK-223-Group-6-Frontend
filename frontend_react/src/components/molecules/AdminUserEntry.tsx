import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { User } from "../../types/models/User.model";
import { useState } from "react";

type ListEntryProps = {
  user: User;
  handleDelete : (id: string) => Promise<void>
};

const UserEntry = ({ user, handleDelete }: ListEntryProps) => {

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteChange = () => {
    setIsDeleting(!isDeleting);
  };

  return (
      <Card sx={{minWidth: 275}}>
          <CardContent>
              {user.firstName} {user.lastName} {user.email}
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
                              onClick={async () => await handleDelete(user.id)}
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
              </CardActions>
          </CardContent>
      </Card>
  );
};

export default UserEntry;
