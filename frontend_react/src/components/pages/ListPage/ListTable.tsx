import Button from "@mui/material/Button";
import { List } from "../../../types/models/List.model";
import ListService from "../../../Services/ListService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListEntry from "../../molecules/ListEntry";

const ListTable = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);

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
      globalThis.location.reload();
    alert("You deleted you list entry!");
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
      {"  "}
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
