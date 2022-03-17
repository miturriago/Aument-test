import React, { useContext } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AuthContext } from "../../context/authProvider";
import { styles } from "./style";
import { Button, CardActions } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function DialogComponent(props) {
  const [title, setTitle] = React.useState(props.item?.title);
  const [text, setText] = React.useState(props.item?.text);
  const [image, setImage] = React.useState(props.item?.image);
  const [tag, setTag] = React.useState(props.item?.tag);
  const [tagopt, setTagopt] = React.useState(props.item?.tag);

  const { setPosts, apiUrl } = useContext(AuthContext);

  const handleChange = (event) => {
    setTagopt(event.target.value);
    if (event.target.value !== "OTHER") {
      setTag(event.target.value);
    }
  };
  const savePost = () => {
    const url = props.action === "new" ? "/posts" : "/posts/" + props.item?._id;
    const date = new Date().toDateString();
    const data = { title, text, image, date, tag };

    fetch(apiUrl + url, {
      method: props.action === "new" ? "POST" : "PUT", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
      })
      .then((response) => {
        fetch(apiUrl + "/posts")
          .then((res) => res.json())
          .then((data) => {
            setPosts(data);
          });
        props.onClose();
      });
  };

  return (
    <div className="Card">
      <Card style={styles.card}>
        <h3>
          <strong>
            {" "}
            {props.action === "new" ? "Crear Post" : "Editar Post"}
          </strong>
        </h3>
        <div style={styles.cardContent}>
          <TextField
            style={styles.input}
            required
            id="outlined-required"
            label="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <InputLabel id="demo-simple-select-label">Descripción*</InputLabel>
          <TextareaAutosize
            minRows={10}
            id="outlined-required"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <br />

          <TextField
            style={styles.input}
            required
            id="outlined-required"
            label="URL imagen"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <InputLabel id="demo-simple-select-label">Tag</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tagopt}
            label="TAG"
            onChange={handleChange}
          >
            <MenuItem value={"HTML"}>HTML</MenuItem>
            <MenuItem value={"CSS"}>CSS</MenuItem>
            <MenuItem value={"JS"}>JS</MenuItem>
            <MenuItem value={"OTHER"}>OTHER</MenuItem>
          </Select>
          <br />
          {tagopt === "OTHER" && (
            <TextField
              style={styles.input}
              required
              id="outlined-required"
              label="TAG"
              value={tag}
              onChange={(e) => setTag(e.target.value.toUpperCase())}
            />
          )}
        </div>
        <CardActions style={styles.action}>
          <Button onClick={props.onClose}>Cancelar</Button>
          <Button
            onClick={() => {
              savePost();
            }}
          >
            Guardar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default DialogComponent;
