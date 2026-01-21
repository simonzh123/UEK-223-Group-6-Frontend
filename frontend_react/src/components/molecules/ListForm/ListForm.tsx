import { useFormik } from "formik";
import { List, Importance } from "../../../types/models/List.model";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import {useContext} from "react";

interface ListProps {
  list: List;
  submitActionHandler: (values: List) => void;
  previousPage: string;
}

const UserForm = ({ list, submitActionHandler, previousPage }: ListProps) => {
  const navigate = useNavigate();
  const { user } = useContext(ActiveUserContext);
  const formik = useFormik({
    initialValues: {
      id: list ? list.id : "",
      title: list ? list.title : "",
      text: list ? list.text : "",
      importance: list ? list.importance : Importance.LOW,
      createdAt: list ? list.createdAt : new Date(),
      user: list?.user ?? user!
    },
    validationSchema: object({
      title: string().required().min(3).max(50),
      text: string().required().max(500),
    }),
    onSubmit: (values: List) => {
      submitActionHandler(values);
    },
    enableReinitialize: true,
  });

  return (
      <form onSubmit={formik.handleSubmit}>
        <Box
            sx={{
              paddingTop: "15px",
              "& .MuiTextField-root": {m: 1, width: "25ch"},
            }}
        >
          <TextField
              id="title"
              name="title"
              label="Title"
              multiline
              variant="outlined"
              sx={{paddingRight: "10px"}}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.title && formik.errors.title)}
              value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title ? (
              <div style={{color: "red"}}>{formik.errors.title}</div>
          ) : null}
          <TextField
              id="text"
              name="text"
              label="Text"
              variant="outlined"
              multiline
              sx={{paddingRight: "10px"}}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.text && formik.errors.text)}
              value={formik.values.text}
          />
          {formik.errors.text && formik.touched.text ? (
              <div style={{color: "red"}}>{formik.errors.text}</div>
          ) : null}
          <InputLabel id="priority-select-label" sx={{paddingRight: "10px"}}>
            Priority
          </InputLabel>
          <Select
              labelId="priority-select-label"
              id="priority-select"
              name="importance"
              value={formik.values.importance}
              label="Priority"
              onChange={formik.handleChange}
              sx={{paddingRight: "10px"}}
              onBlur={formik.handleBlur}
          >
            <MenuItem value={Importance.LOW}>Low</MenuItem>
            <MenuItem value={Importance.MEDIUM}>Medium</MenuItem>
            <MenuItem value={Importance.HIGH}>High</MenuItem>
          </Select>
        </Box>
        <div>
          <Button
              sx={{marginTop: "15px", marginRight: "10px"}}
              variant="contained"
              color="success"
              id="submit"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
          >
            {list.id && "Save"}
            {!list.id && "Add"}
          </Button>
          <Button
              sx={{marginTop: "15px"}}
              variant="contained"
              color="error"
              onClick={() => {
                navigate("/" + previousPage);
              }}
          >
            Cancel
          </Button>
        </div>
      </form>
  );
};

export default UserForm;
