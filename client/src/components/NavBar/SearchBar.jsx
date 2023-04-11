import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const BASE_HOST = process.env.REACT_APP_BASE_HOST;

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  useEffect(() => {
    fetch(BASE_HOST + `/api/products/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data ? (
        <Autocomplete
          id="serch_bar"
          options={data}
          getOptionLabel={(option) => option.name}
          onChange={(event, option) => {
            navigate(`/detail/${option._id}`);
          }}
          style={{ width: "100%" }}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return <StyledInputBase {...params.InputProps} {...rest} />;
          }}
        />
      ) : (
        <StyledInputBase placeholder={"Cargando..."} />
      )}
    </>
  );
}
