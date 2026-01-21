import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../types/models/User.model";
import UserService from "../../../Services/UserService";
import UserForm from "../../molecules/UserForm/UserForm";
import { useEffect, useState } from "react";

const UserPage = () => {
  const navigate = useNavigate();
  const { previousPage, userId } = useParams();
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  });

  useEffect(() => {
    return () => {
      if (userId) {
        UserService.getUser(userId).then((res) => {
          return setUser(res);
        });
      }
    };
  }, [userId]);

  const submitActionHandler = async (values: User) => {
    if (userId === undefined) {
      await UserService.addUser(values).then(() => {
        navigate(("/" + previousPage));
        alert("You added a new user!");
      });
    } else {
      await UserService.updateUser(values).then(() => {
        navigate(("../" + previousPage));
        alert("Your user profile got updated!");
      });
    }
  };

  return (
    <UserForm
      user={user}
      submitActionHandler={submitActionHandler}
      previousPage={previousPage as string}
    />
  );
};
export default UserPage;
