import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
//, SubmitHandler
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Connexion() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Utilisateur")) {
      navigate("/");
    }
  }, []);

  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .get(
        `http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}&
        moDePasse=${data.moDePasse}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("Utilisateur", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("Connexion réussi ");
        } else {
          toast.error("Les identifiants sont incorrects  ");
        }
      });
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={" #f5f5f5"}
    >
      <Box
        width={500}
        sx={{
          backgroundColor: " #fff",
          padding: 3,
        }}
      >
        <Typography variant="h1">Connexion</Typography>

        <form
          style={{
            marginTop: 2,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={3}>
            <TextField
              id="outlined-basic"
              label="Veuillez saisir votre email "
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("emailUtilisateur", {
                required: "Veuillez saisir email",
                pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$",
              })}
            />
            <TextField
              id="outlined-basic"
              label="Veuillez saisir un password "
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("moDePasse", {
                required: "Veuillez saisir le password",
                minLength: {
                  value: 6,
                  message: "Le password doit contenir au moins  6 caractéres ",
                },
              })}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
          >
            Connexion
          </Button>
          <Typography paddingTop={2}>
            Voulez-vous créer un compte ?{" "}
            <Link to={"/inscription"}>Cliquez-ici</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}
