import { useNavigate, useParams } from "react-router-dom";
import { List, Importance } from "../../../types/models/List.model";
import ListService from "../../../Services/ListService";
import ListForm from "../../molecules/ListForm/ListForm";
import { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

const ListPage = () => {
  const navigate = useNavigate();
  const { previousPage, listEntryId } = useParams();
  const { user } = useContext(ActiveUserContext);
  const [list, setList] = useState<List>({
    id: "",
    title: "",
    text: "",
    importance: Importance.LOW,
    createdAt: new Date(),
    user: user!,
  });

  useEffect(() => {
    return () => {
      if (listEntryId) {
        ListService.getList(listEntryId).then((res) => {
          return setList(res);
        });
      }
    };
  }, [listEntryId]);

  const submitActionHandler = async (values: List) => {
    if (listEntryId !== undefined && listEntryId !== "") {
      await ListService.updateList(values).then(() => {
        navigate(("../" + previousPage));
        alert("Your list entry got updated!");
      });
    } else {
      await ListService.addList(values).then(() => {
        navigate(("/" + previousPage));
        alert("You added a new list entry!");
      });
    }
  };

  return (
    <ListForm
      list={list}
      submitActionHandler={submitActionHandler}
      previousPage={previousPage as string}
    />
  );
};
export default ListPage;
