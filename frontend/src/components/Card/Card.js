import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import { Button, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styles } from "./style";
import { AuthContext } from "../../context/authProvider";

function CardComponent(props) {
  const [expanded, setExpanded] = React.useState(false);
  const { setPosts, apiUrl } = useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deletePost = () => {
    fetch(apiUrl + "/posts/" + props.item._id, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) =>
        fetch(apiUrl + "/posts")
          .then((res) => res.json())
          .then((data) => {
            setPosts(data);
          })
      );
  };
  return (
    <div onClick={handleExpandClick} className="Card">
      <Card style={styles.card}>
        <CardMedia
          component="img"
          height={200}
          image={props.item.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://cloc.condesan.org/intranet/wp-content/plugins/learnpress/assets/images/no-image.png";
          }}
          alt=""
        />
        <div style={styles.cardContent}>
          <div style={styles.row}>
            <div
              style={
                props.item.tag === "HTML"
                  ? styles.chipHTML
                  : props.item.tag === "CSS"
                  ? styles.chipCSS
                  : props.item.tag === "JS"
                  ? styles.chipJS
                  : styles.chipOTHER
              }
            >
              {props.item.tag}
            </div>
            <span style={styles.date}>{props.item.date}</span>
          </div>

          <Typography align="justify" style={styles.title} component="div">
            {props.item.title}
          </Typography>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography align="justify" paragraph>
                {props.item.text}
              </Typography>
              <CardActions style={styles.action}>
                <Button
                  onClick={() => {
                    deletePost();
                  }}
                >
                  Eliminar
                </Button>
                <Button onClick={props.openDialog}>Editar</Button>
              </CardActions>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </div>
  );
}

export default CardComponent;
