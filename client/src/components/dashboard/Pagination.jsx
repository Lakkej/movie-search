import Pagination from "@mui/material/Pagination";

//Used for switching pages in Search

function PaginationComponent({ searchObj, searchInfo, setSearchInfo }) {
  const validState = searchObj.Response === "True";
  return (
    <Pagination
      style={{
        visibility: validState ? "visible" : "hidden",
      }}
      count={validState ? Math.round(Number(searchObj.totalResults / 10)) : 0}
      page={Number(searchInfo.page)}
      color="primary"      
      onChange={(event, page) =>
        setSearchInfo((prevState) => {
          return { ...prevState, page: page };
        })
      }
    />
  );
}

export default PaginationComponent;
