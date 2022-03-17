import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Card from "../Card/Card";
import DialogComponent from "../Dialog/Dialog";
import { AuthContext } from "../../context/authProvider";
import Dialog from "@mui/material/Dialog";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from '@mui/material/Tooltip';


import { styles } from "./styles";

function Content() {
  const { posts, setPosts, apiUrl } = useContext(AuthContext);
  const [current, setCurrent] = React.useState(null);
  const [action, setAction] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(apiUrl + "/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [apiUrl, setPosts]);
  return (
    <Box style={styles.main}>
      
      <div style={styles.add}>
        <div></div>
        <h2>Posts</h2>
      <Tooltip title="Añadir nuevo post">
        <Fab
          onClick={() => {
            setAction("new");
            setCurrent(null);
            setOpen(true);
          }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        </Tooltip>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogComponent
          onClose={handleClose}
          action={action}
          item={current}
        />
      </Dialog>

      {posts.length !== 0 ? (
        <>
          {posts.map((post) => (
            <div>
              <Card
                openDialog={() => {
                  setAction("edit");
                  setCurrent(post);
                  handleOpen();
                }}
                item={post}
                key={post._id}
              />
            </div>
          ))}
        </>
      ) : (
        <lottie-player
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "250px",
            width: "500px",
          }}
          className="_logo"
          src="https://assets8.lottiefiles.com/packages/lf20_szlepvdh.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      )}
    </Box>
  );
}

export default Content;
