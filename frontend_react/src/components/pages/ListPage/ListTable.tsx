import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { List } from '../../../types/models/List.model';
import ListService from '../../../Services/ListService';
import { useNavigate } from 'react-router-dom';

const ListTable = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    ListService.getAllLists().then((data) => {
      setLists(data);
    });
  }, []);

  const handleAdd = () => {
    navigate('../user/edit/');
  };

  const handleEdit = (id: string) => {
    navigate('../user/edit/' + id);
  };

  const handleDelete = (id: string) => {
    ListService.deleteList(id);
    window.location.reload()
  };

  return (
    <>
      {lists.map((list) => (
        <div key={list.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {list.title} {list.user.firstName} {list.user.lastName}
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  variant='contained'
                  onClick={() => handleEdit(list.id)}
                >
                  Edit
                </Button>
                <Button
                  size='small'
                  color='error'
                  variant='contained'
                  onClick={() => handleDelete(list.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      ))}
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

export default ListTable;
