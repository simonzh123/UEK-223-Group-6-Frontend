import Button from "@mui/material/Button";
import { useContext } from "react";
import { User } from "../../../types/models/User.model";
import UserService from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import UserEntry from "../../molecules/UserEntry";

const UserTable = () => {
  const navigate = useNavigate();
  const user = useContext(ActiveUserContext).user as User;

  const handleAdd = () => {
    navigate("../user/edit/user");
  };

  const handleEdit = (id: string) => {
    navigate("../user/edit/user/" + id);
  };

  const handleDelete = async (id: string) => {
    await UserService.deleteUser(id);
      globalThis.location.reload();
    alert("You deleted your user profile!");
  };

  return (
    <>
      <Button
        id="linkToHome"
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#00d4ff",
          "&:hover": { backgroundColor: "#0f0fcf" },
        }}
        onClick={() => navigate("/")}
      >
        Homepage
      </Button>
      <div key={user.id}>
        <UserEntry
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          user={user}
        />
      </div>
      <Button
        size="small"
        color="success"
        variant="contained"
        onClick={handleAdd}
      >
        Add
      </Button>
    </>
  );
};

export default UserTable;
