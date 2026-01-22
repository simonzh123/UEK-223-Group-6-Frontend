import api from "../config/Api";
import { List } from "../types/models/List.model";
import { ListDTO } from "../types/models/List.model";
import { Importance } from "../types/models/List.model";

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
    } as List;
  },

  updateList: (list: List) => {
    return api.put(`/list-entries/${list.id}`, list);
  },

  addList: (list: List) => {
    return api.post("/list-entries", {title: list.title, text: list.text, importance: list.importance, user: list.user }).then((res) => {
      return res.data;
    });
  },

  getAllLists: async (params?: { importance?: string; sortBy?: string; sortOrder?: string; userId?: string; isAscending?: boolean }) => {
    const response = await api.get(`/list-entries/user`, { params });
    return (response.data as ListDTO[]).map((listElement) => ({
      id: listElement.id,
      title: listElement.title,
      text: listElement.text,
      importance: Importance[listElement.importance as keyof typeof Importance],
      createdAt: new Date(listElement.createdAt),
      user: listElement.user,
    } as List));
  },

  getAllListsAdmin: async (params?: { importance?: string; sortBy?: string; sortOrder?: string; userId?: string }) => {
    const response = await api.get(`/list-entries`, { params });
    return (response.data as ListDTO[]).map((listElement) => ({
      id: listElement.id,
      title: listElement.title,
      text: listElement.text,
      importance: Importance[listElement.importance as keyof typeof Importance],
      createdAt: new Date(listElement.createdAt),
      user: listElement.user,
    } as List));
  },

  deleteList: async (id: string) => {
    return await api.delete(`/list-entries/${id}`);
  },
};

export default ListService;
