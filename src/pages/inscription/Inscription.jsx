import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
//, SubmitHandler
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.moDePasse !== data.moDePasseConfir) {
      toast.error("Les mots de passe ne correspondent pas ");
    } else {
      await axios
        .get(
          `http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            toast.error("Utilidateur exit deja ");
          } else {
            axios
              .post("http://localhost:3000/utilisateurs", data)
              .then((res) => {
                toast.success("Inscription réussie");
                navigate("/connexion");
              })
              .catch((err) => {
                toast.error("Une erreur est sur venue ");
              });
          }
        });
    }
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
        <Typography variant="h1">Inscription</Typography>

        <form
          style={{
            marginTop: 2,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={3}>
            <TextField
              id="outlined-basic"
              label="Veuillez saisir votre nom "
              variant="outlined"
              fullWidth
              size="small"
              type="text"
              {...register("nomUtilisateur", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 5,
                  message: "veuillez saisir un nom de plus de 5 caractéres ",
                },
              })}
            />
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
            <TextField
              id="outlined-basic"
              label="Veuillez confirmer votre password "
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("moDePasseConfir", {
                required: "Veuillez confirmer le password",
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
            Inscription
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
