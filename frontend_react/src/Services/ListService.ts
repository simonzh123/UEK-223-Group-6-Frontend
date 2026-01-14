import api from "../config/Api";
import { List } from "../types/models/List.model";
import { ListDTO } from "../types/models/List.model";
import { Importance } from "../types/models/List.model";
import UserService from "./UserService";

const ListService = {
  getList: async (listID: string): Promise<List> => {
    const response = await api.get(`/list-entries/${listID}`) as ListDTO;
    const data: List = {
      id: response.id,
      title: response.title,
      text: response.text,
      importance: Importance[response.importance as keyof typeof Importance],
      createdAt: new Date(response.createdAt),
      user: response.user,
    };
    return data;
  },

  updateList: (list: List) => {
    return api.put(`/list-entries/${list.id}`, list);
  },

  addList: (list: List) => {
    return api.post("/list-entries", list).then((res) => {
      return res.data;
    });
  },

  getAllLists: async () => {
    const response = await api.get(`/list-entries`);
    const data: List[] = (response.data as ListDTO[]).map((listElement) => {
      return {
        id: listElement.id,
        title: listElement.title,
        text: listElement.text,
        importance:
          Importance[listElement.importance as keyof typeof Importance],
        createdAt: new Date(listElement.createdAt),
        user: listElement.user,
      } as List;
    });
    return data;
  },

  deleteList: (id: string) => {
    return api.delete(`/list-entries/${id}`);
  },
};

export default ListService;
