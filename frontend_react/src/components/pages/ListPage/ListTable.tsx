import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { List, Importance } from "../../../types/models/List.model";
import { User } from "../../../types/models/User.model";
import roles from "../../../config/Roles";
import ListService from "../../../Services/ListService";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ActiveUserContext, {ActiveUserContextType} from "../../../Contexts/ActiveUserContext";
const ListTable = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);
  const activeUser = useContext(ActiveUserContext);

  const isAdmin = (user: ActiveUserContextType): boolean => {
    return user.checkRole("ADMIN");
  };

  useEffect(() => {
    ListService.getAllLists().then((data) => {
      setLists(data);
    });
  }, []);

  const handleAdd = () => {
    navigate("../list/edit/list");
  };

  const handleEdit = (id: string) => {
    navigate("../list/edit/list/" + id);
  };

  const handleDelete = (id: string) => {
    ListService.deleteList(id);
    window.location.reload();
  };

  return (
    <>
      <Link href="/user">To User Page</Link>
      {"  "}
      {isAdmin(activeUser) ? <Link href="/admin">To Admin Page</Link> : <></>}
      {lists.map((list) => (
        <div key={list.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ borderBottom: "1px solid" }}>
              Author: {list.user.firstName} {list.user.lastName} <br />
              Priority: {Importance[list.importance]} <br /> {list.title} <br />
              -------------------------------------- <br />
              {list.text}
              <br />
              <br />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleEdit(list.id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete(list.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      ))}
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

export default ListTable;
