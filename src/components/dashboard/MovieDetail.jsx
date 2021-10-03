import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import qs from "query-string";
import { Box } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function MovieDetail({ token }) {
  const history = useHistory();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  //Used for fetching data from server and if its empty string to not show dialog

  const [hash, setHash] = useState(qs.parse(history.location.hash));
  const [movieDetail, setMovieDetail] = useState(null);
  const handleClose = () => {
    setHash(null);
    history.push({ ...history.location, hash: null });
    setMovieDetail(null);
  };

  //On load and when hash changers (by clicking on MovieCard) fetches the data and shows the (MovieDetail)

  useEffect(() => {
    async function handleMovieSearch() {
      if (history.location.hash === "") {
        handleClose();
        return;
      }
      const hashTemp = qs.parse(history.location.hash);
      setHash(qs.parse(history.location.hash));
      try {
        let config = {
          method: "get",
          url: `http://localhost:3001/api/search?i=${hashTemp.imdbID}&detail=true`,
          headers: {
            Authorization: `Basic ${token}`,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          setMovieDetail(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleMovieSearch();
  }, [, history.location.hash]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby={`dialog-for-movie`}
        open={Boolean(hash)}
      >
        {movieDetail === null || movieDetail?.Response === "False" ? (
          <>"Loading..."</>
        ) : (
          <>
            <BootstrapDialogTitle id={movieDetail.imdbID} onClose={handleClose}>
              {`${movieDetail.Title} (${movieDetail.Year})`}
              <Typography variant="subtitle2">
                {movieDetail.Director}
              </Typography>
              <Typography
                gutterBottom
              >{`IMDb: ${movieDetail.imdbRating}/10`}</Typography>
              <Rating
                name="imdbRating"
                readOnly
                max={10}
                defaultValue={Number(movieDetail.imdbRating)}
                title={`Out of: ${movieDetail.imdbVotes}`}
              />
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <img
                style={{ float: "right" }}
                height={"80%"}
                src={`${movieDetail.Poster}?w=164&h=164&fit=crop&auto=format`}
                alt={`${movieDetail.Title} poster`}
                loading="lazy"
              />

              <Typography>
                <b>Genre:</b>
                {` ${movieDetail.Genre}`}
              </Typography>
              <Typography>
                <b>Runtime:</b>
                {` ${movieDetail.Runtime}`}
              </Typography>
              <Typography>
                <b>Released:</b>
                {` ${movieDetail.Released}`}
              </Typography>
              <Typography>
                <b>Actors:</b>
                {` ${movieDetail.Actors}`}
              </Typography>
              <Typography gutterBottom>
                <b>Plot:</b>
                {` ${movieDetail.Plot}`}
              </Typography>
            </DialogContent>
          </>
        )}
      </BootstrapDialog>
    </div>
  );
}

export default MovieDetail;
