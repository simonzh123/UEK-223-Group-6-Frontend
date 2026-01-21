import api from "../config/Api";
import {Importance, List, ListDTO} from "../types/models/List.model";

const ListService = {
  getList: async (listID: string): Promise<List> => {
    const response = await api.get(`/list-entries/${listID}`);
    return {
      id: response.data.id,
      title: response.data.title,
      text: response.data.text,
      importance: Importance[response.data.importance as keyof typeof Importance],
      createdAt: new Date(response.data.createdAt),
      user: response.data.user,
    };
  },

  updateList: (list: List) => {
    return api.put(`/list-entries/${list.id}`, list);
  },

  addList: (list: List) => {
    return api.post("/list-entries", {title: list.title, text: list.text, importance: list.importance, user: list.user }).then((res) => {
      return res.data;
    });
  },

  getAllLists: async () => {
    const response = await api.get(`/list-entries/user`);
    const data: List[] = (response.data as ListDTO[]).map((listElement) => {
      return {
        id: listElement.id,
        title: listElement.title,
        text: listElement.text,
        importance:
          Importance[listElement.importance as keyof typeof Importance],
        user: listElement.user,
      } as List;
    });
    return data;
  },

  getAllListsAdmin: async () => {
    const response = await api.get(`/list-entries`);
    const data: List[] = (response.data as ListDTO[]).map((listElement) => {
      return {
        id: listElement.id,
        title: listElement.title,
        text: listElement.text,
        importance:
          Importance[listElement.importance as keyof typeof Importance],
        user: listElement.user,
      } as List;
    });
    return data;
  },

  deleteList: async (id: string) => {
    return await api.delete(`/list-entries/${id}`);
  },
};

export default ListService;
