import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";

function MovieCard({ movie, token, getDetail }) {
  const history = useHistory();
  return (
    <Card
      onClick={() =>
        history.push({
          ...history.location,
          hash: `imdbID=${movie.imdbID}`,
        })
      }
      sx={{ width: 300 }}
      style={{ margin: "16px" }}
    >
      <CardMedia
        component="img"
        height="428px"
        image={movie.Poster}
        alt={movie.Title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.Title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          {movie.Year}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default MovieCard;
