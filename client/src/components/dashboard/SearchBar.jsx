import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { makeStyles, useTheme } from "@mui/styles";
import axios from "axios";
import qs from "query-string";
import Pagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  container: {
    //height:"30vh",
    //marginTop:theme.spacing(15),
    borderRadius: "15px 50px",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  form: {
    padding: theme.spacing(3),

    backgroundColor: theme.palette.background.paper,
    borderRadius: "15px 50px",
  },
}));

function SearchBar({ token, searchObj, setSearchObj, setSearching }) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchInfo, setSearchInfo] = useState({
    s: "",
    y: "",
    type: "movie",
    page: 1,
  });

  useEffect(() => {
    async function handleMoviesSearch() {
      setSearching(true);
      if (history.location.search === "") {
        return;
      }
      try {
        let config = {
          method: "get",
          url: `http://localhost:3001/api/search${history.location.search}`,
          headers: {
            Authorization: `Basic ${token}`,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          setSearchObj(response.data);
          setSearching(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleMoviesSearch();
  }, [, history.location.search]);

  useEffect(() => {
    if (history.location.search !== "") {
      setSearchInfo(qs.parse(history.location.search));
    }
  }, []);

  useEffect(() => {
    if (searchInfo.s.length > 1 || searchInfo.y.length === 4) {
      handleSearch();
    }
  }, [searchInfo]);

  const handleChange = (event, name) => {
    setSearchInfo((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const handleSearch = () => {
    const searchInfoBetter = {
      ...searchInfo,
      y: searchInfo.y === "" ? "" : new Date(searchInfo.y).getFullYear(),
    };
    history.push({ search: new URLSearchParams(searchInfoBetter).toString() });
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.container}>
        <Typography
          component="h1"
          variant={matches ? "h2" : "h1"}
          style={{ alignStart: "start" }}
        >
          {"Search..."}
        </Typography>
        <TextField
          required
          fullWidth
          label="What is it called..."
          name="search"
          id="search"
          value={searchInfo.s}
          onChange={(event) => handleChange(event, "s")}
          margin="dense"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
          }}
        >
          <FormControl style={{ width: "40%" }}>
            <InputLabel id="type">What is it...</InputLabel>
            <Select
              labelId="type"
              name="type"
              id="type"
              label="What is it..."
              value={searchInfo.type}
              onChange={(event) => handleChange(event, "type")}
            >
              <MenuItem value={"movie"}>Movie</MenuItem>
              <MenuItem value={"series"}>Series</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              views={["year"]}
              style={{ width: matches ? "20%" : "40%" }}
              label="What year..."
              value={searchInfo.y}
              clearable={true}
              onChange={(newValue) => {
                if (newValue === null) {
                  newValue = "";
                }
                setSearchInfo((prevState) => {
                  return { ...prevState, y: newValue };
                });
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </div>
        <Pagination
          searchObj={searchObj}
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
        />
      </form>
    </Container>
  );
}

export default SearchBar;
