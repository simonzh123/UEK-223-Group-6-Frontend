import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { List, Importance } from "../../../types/models/List.model";
import { User } from "../../../types/models/User.model";
import roles from "../../../config/Roles";
import ListService from "../../../Services/ListService";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ActiveUserContext, {
  ActiveUserContextType,
} from "../../../Contexts/ActiveUserContext";
import ListEntry from "../../molecules/ListEntry";

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

  const handleDelete = async (id: string) => {
    await ListService.deleteList(id);
    window.location.reload();
    alert("You deleted you list entry!");
  };

  return (
    <>
      <Link id="linkToHome" href="/">
        To the Homepage
      </Link>
      {"  "}
      {isAdmin(activeUser) ? <Link href="/admin">To Admin Page</Link> : <></>}
      {lists.map((list) => (
        <div key={list.id}>
          <ListEntry
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            list={list}
          />
        </div>
      ))}
      <Button
        id="add"
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
