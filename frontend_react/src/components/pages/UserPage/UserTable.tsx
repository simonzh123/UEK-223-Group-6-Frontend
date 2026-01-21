import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useEffect, useState, useContext } from "react";
import { User } from "../../../types/models/User.model";
import UserService from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import roles from "../../../config/Roles";
import ActiveUserContext, {
  ActiveUserContextType,
} from "../../../Contexts/ActiveUserContext";
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
    window.location.reload();
    alert("You deleted your user profile!");
  };

  return (
    <>
      <Link id="linkToHome" href="/">
        To the Homepage
      </Link>
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
