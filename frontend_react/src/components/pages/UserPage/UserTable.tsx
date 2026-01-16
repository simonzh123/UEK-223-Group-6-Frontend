import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useEffect, useState, useContext } from 'react';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import { useNavigate } from 'react-router-dom';
import roles from '../../../config/Roles';
import ActiveUserContext, {ActiveUserContextType} from "../../../Contexts/ActiveUserContext";


const UserTable = () => {
  const navigate = useNavigate();
  const user = useContext(ActiveUserContext).user as User;

  const handleAdd = () => {
    navigate('../user/edit/');
  };

  const handleEdit = (id: string) => {
    navigate('../user/edit/' + id);
  };

  const handleDelete = async (id: string) => {
    await UserService.deleteUser(id);
    window.location.reload()
  };

  return (
    <>
      <Link href="/list">To the List</Link>
        <div key={user.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {user.firstName} {user.lastName} {user.email}
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
            </CardContent>
          </Card>
        </div>
      <Button
        size='small'
        color='success'
        variant='contained'
        onClick={handleAdd}
      >
        Add
      </Button>
    </>
  );
};

export default UserTable;
