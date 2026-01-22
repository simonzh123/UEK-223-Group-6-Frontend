import Button from "@mui/material/Button";
import { List, SortByListCategories } from "../../../types/models/List.model";
import ListService from "../../../Services/ListService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListEntry from "../../molecules/ListEntry";
import ListDropdowns from "../../molecules/ListDropdowns/ListDropdowns";

const ListTable = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);

  const [filterValue, setFilterValue] = useState<string>();
  const [sortValue, setSortValue] = useState<SortByListCategories>();
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const loadLists = async (
    importance?: string,
    sortBy?: string,
    asc?: boolean,
  ) => {
    const params: any = {};
    if (importance) params.importance = importance;
    if (sortBy) {
      const SORT_FIELD_MAP: Record<string, string> = {
        [SortByListCategories.DATE]: "createdAt",
        [SortByListCategories.IMPORTANCE]: "importance",
      };
      params.sortBy = SORT_FIELD_MAP[sortBy] || sortBy;
    }
    if (asc !== undefined) params.isAscending = asc;
      const data = await ListService.getAllLists(page, params);
      setLists(data);
  };

  useEffect(() => {
    loadLists(undefined, undefined, isAscending);
  }, []);
  useEffect(() => {
    ListService.getAllListsPagesCount().then((count) => {
      setTotalPages(count);
    });
    loadLists(undefined, undefined, isAscending);
  }, []);

  useEffect(() => {
    loadLists(
      filterValue || undefined,
      sortValue || undefined,
      isAscending,
    );
  }, [filterValue, sortValue, isAscending, page]);

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
        <ListDropdowns
            filterValue={filterValue}
            sortValue={sortValue}
            onFilterChange={setFilterValue}
            onSortChange={setSortValue}
            isAdmin={false}
            isAscending={isAscending}
            onIsAscendingChange={() => setIsAscending(!isAscending)}
        />
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          Previous
        </Button>
        <span style={{ display: "flex", alignItems: "center" }}>
          Page {page + 1}
        </span>
        <Button
          variant="contained"
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

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
