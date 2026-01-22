import Button from "@mui/material/Button";
import { List, SortByListCategories } from "../../../types/models/List.model";
import ListService from "../../../Services/ListService";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ActiveUserContext, { ActiveUserContextType } from "../../../Contexts/ActiveUserContext";
import ListEntry from "../../molecules/ListEntry";
import ListDropdowns from "../../molecules/ListDropdowns/ListDropdowns";
import { User } from "../../../types/models/User.model";
import UserService from "../../../Services/UserService";

const ListTable = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);
  const activeUser = useContext(ActiveUserContext);

  const [filterValue, setFilterValue] = useState<string>();
  const [sortValue, setSortValue] = useState<SortByListCategories>();
  const [userFilterValue, setUserFilterValue] = useState<string>();
  const [users, setUsers] = useState<User[]>([]);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const isAdmin = (user: ActiveUserContextType): boolean => {
    return user.checkRole("ADMIN");
  };

    const loadLists = async (importance?: string, sortBy?: string, userId?: string, asc?: boolean) => {
        const params: any = {};
        if (importance) params.importance = importance;
        if (sortBy) {
            const SORT_FIELD_MAP: Record<string, string> = {
                [SortByListCategories.DATE]: 'createdAt',
                [SortByListCategories.IMPORTANCE]: 'importance',
                [SortByListCategories.USER]: 'user',
            };
            params.sortBy = SORT_FIELD_MAP[sortBy] || sortBy;
        }
        if (userId) params.userId = userId;
        if (isAdmin(activeUser)) {
            if (asc !== undefined) params.sortOrder = asc ? 'ASC' : 'DESC';
            const data = await ListService.getAllListsAdmin(params);
            setLists(data);
        } else {
            if (asc !== undefined) params.isAscending = asc;
            const data = await ListService.getAllLists(params);
            setLists(data);
        }
    };

        useEffect(() => {
            loadLists(undefined, undefined, undefined, isAscending);
        }, []);
  useEffect(() => {
    if (isAdmin(activeUser)) {
      UserService.getAllUsers().then((data) => {
        setUsers(data.data);
      });
    }
    loadLists(undefined, undefined, undefined, isAscending);
  }, []);

        useEffect(() => {
            loadLists(filterValue || undefined, sortValue || undefined, userFilterValue || undefined, isAscending);
        }, [filterValue, sortValue, userFilterValue, isAscending]);

  const handleAdd = () => {
    navigate("../list/edit/list");
  };

  const handleEdit = (id: string) => {
    navigate("../list/edit/list/" + id);
  };

  const handleDelete = async (id: string) => {
    await ListService.deleteList(id);
    window.location.reload();
    alert("You deleted your list entry!");
  };

  return (
    <>
      <Link href="/user">To User Page</Link>{"  "}
        <ListDropdowns
          filterValue={filterValue}
          sortValue={sortValue}
          onFilterChange={setFilterValue}
          onSortChange={setSortValue}
          users={users}
          userFilterValue={userFilterValue}
          onUserFilterChange={setUserFilterValue}
          isAdmin={isAdmin(activeUser)}
          isAscending={isAscending}
          onIsAscendingChange={() => setIsAscending(!isAscending)}
        />
      {isAdmin(activeUser) ? <Link href="/admin">To Admin Page</Link> : <></>}
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
