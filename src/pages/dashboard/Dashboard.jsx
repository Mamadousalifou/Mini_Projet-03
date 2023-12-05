import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Box, Avatar, Typography, Stack } from "@mui/material";
import AjouterPub from "./Components/AjouterPub";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [publication, setPublication] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("Utilisateur")) {
      navigate("/connexion");
    }

    axios.get("http://localhost:3000/publication").then((res) => {
      setPublication(res.data);
    });
  }, []);

  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar />
      <AjouterPub />
      <Box width={"50%"} margin={"auto"} marginTop={2}>
        {publication.map((pub) => (
          <Box
            width={"100%"}
            bgcolor={"#ffff"}
            marginBottom={3}
            borderRadius={4}
            padding={2}
            key={pub.id}
          >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Avatar src={pub.photoUtilisateur} />
              <Typography>{pub.auteur}</Typography>
            </Stack>
            <Typography>{pub.postContent}</Typography>
            <img
              src={pub.postlink}
              style={{
                width: "100%",
                borderRadius: 4,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
