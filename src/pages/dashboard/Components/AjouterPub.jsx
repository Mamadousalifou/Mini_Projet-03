import { Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AjouterPub() {
  const user = JSON.parse(localStorage.getItem("Utilisateur"));
  const {
    handleSubmit,
    register,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const publication = {
      ...data,
      idUtilisateur: user.id,
      dataPublication: new Date(),
      likePost: 0,
      auteur: user.nomUtilisateur,
    };
    await axios
      .post("http://localhost:3000/publication", publication)
      .then(() => {
        toast.success("Publication réussi");
        reset();
      })
      .catch(() => {
        toast.error("Publication Echouer ");
      });
  };

  return (
    <Stack width={"60%"} margin={"auto"} textAlign={"center"}>
      <h1>Ajouter une publication</h1>
      <form style={{ marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="Parlez-nous de votre journée "
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            multiline
            rows={4}
            {...register("postContent", {
              required: "Veuillez saisir quelque chose",
              minLength: {
                value: 10,
                message: "veuillez saisir un nom de plus de 20 caractéres ",
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Saisir l'url de votre image"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            {...register("postlink", {
              required: "Veuillez saisir quelque chose",
              minLength: {
                value: 5,
                message: "veuillez saisir un nom de plus de 20 caractéres ",
              },
            })}
          />
          <Button type="submit" variant="contained">
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
