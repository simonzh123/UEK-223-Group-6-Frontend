import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { List } from "../../../types/models/List.model";
import { User } from "../../../types/models/User.model";
import ListService from "../../../Services/ListService";
import UserService from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import AdminListEntry from "../../molecules/AdminListEntry";
import AdminUserEntry from "../../molecules/AdminUserEntry";

const AdminListTable = () => {
  const navigate = useNavigate();
  const oldValue = localStorage.getItem("showList") as unknown as string;
  const [showList, setShowList] = useState<boolean>(
    oldValue && oldValue != null ? JSON.parse(oldValue.toLowerCase()) : false,
  );
  const [users, setUsers] = useState<User[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  const handleShowListChange = (newValue: boolean) => {
    setShowList(newValue);
    localStorage.setItem("showList", newValue as unknown as string);
  };

  useEffect(() => {
    UserService.getAllUsers().then((data) => {
      setUsers(data.data);
    });
    ListService.getAllListsAdmin().then((data) => {
      setLists(data);
    });
  }, []);

  if (showList) {
    const handleAdd = () => {
      navigate("../list/edit/admin");
    };

    const handleDelete = async (id: string) => {
      await ListService.deleteList(id);
      globalThis.location.reload();
      alert("You deleted the list entry!");
    };
    return (
      <>
        <Switch
          checked={showList}
          onChange={() => handleShowListChange(!showList)}
        />
        show List Entries <br />
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
        {lists.map((list) => (
          <div key={list.id}>
            <AdminListEntry list={list} handleDelete={handleDelete} />
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
  } else {
    const handleAdd = () => {
      navigate("../user/edit/admin");
    };

    const handleDelete = async (id: string) => {
      await UserService.deleteUser(id);
      globalThis.location.reload();
      alert("You deleted a user profile!");
    };
    return (
      <>
        <Switch
          checked={showList}
          onChange={() => handleShowListChange(!showList)}
        />
        show Users <br />
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
        {users.map((user) => (
          <div key={user.id}>
            <AdminUserEntry user={user} handleDelete={handleDelete} />
          </div>
        ))}
        <br />
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
  }
};

export default AdminListTable;
