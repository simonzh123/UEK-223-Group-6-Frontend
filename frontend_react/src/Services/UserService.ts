import api from '../config/Api';
import { User } from '../types/models/User.model';

const UserService = {
  getUser: async (userID: string): Promise<User> => {
    const { data } = await api.get<User>(`/user/${userID}`);
    return data;
  },

  updateUser: (user: User) => {
    return api.put(`/user/${user.id}`, user);
  },

  addUser: async (user: User) => {
    const res = await api.post('/user/registerUser', user);
    return res.data;
  },

  getAllUsers: () => {
    return api.get(`/user`);
  },

  deleteUser: async (id: string) => {
    return await api.delete(`/user/${id}`);
  },
};

export default UserService;
