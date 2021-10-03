import { useState } from "react";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import SearchBar from "./SearchBar";


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px 50px",
  },
  movieCards: {
    minHeight: "80vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "space-evenly",
    paddingTop: theme.spacing(2),
  },
}));

function Dashboard({ token }) {
  const classes = useStyles();
  
  const [searching, setSearching] = useState(true);
  const [searchObj, setSearchObj] = useState([]);
  return (
    <>
      <Container maxWidth="xl" className={classes.container}>
        <SearchBar
          token={token}
          searchObj={searchObj}
          setSearchObj={setSearchObj}
          setSearching={setSearching}
        />
        <div className={classes.movieCards}>
          {searching || searchObj.Response === "False"
            ? ""
            : searchObj.Search.map((movie, index) => (
                <MovieCard                  
                  key={movie.imdbID+index}
                  movie={movie}
                />
              ))}
        </div>
      </Container>
      <MovieDetail token={token} />
    </>
  );
}

export default Dashboard;
