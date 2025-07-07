import { ChangeEvent, useEffect, useState } from "react";

import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IconButton } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchInput({
  className = "",
  href = "",
  inputValue = "",
  setInputValue = (val: string) => {
    val;
  },
}) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    setInputValue(searchText);
    let href_ = href;
    if (searchText) {
      href_ += "?text=" + searchText;
    }
    navigate(href_);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
  };
  const handleClean = () => {
    setSearchText("");
  };

  useEffect(() => {
    setSearchText(inputValue);
  }, [inputValue]);

  return (
    <Search className={`transition-all ${className}`}>
      <IconButton
        className="absolute z-10 hover:text-[#FFB457] hover:bg-[#FF705B]/20 transition-all rounded-none"
        title="Buscar"
        onClick={handleSearch}
      >
        <IoSearch />
      </IconButton>

      <StyledInputBase
        placeholder="Buscar…"
        inputProps={{
          "aria-label": "buscar",
          value: searchText,
          onChange: handlechange,
          name: "search-text",
          title: "Buscar...",
        }}
        onKeyDown={handleEnter}
      />

      <IconButton
        size="small"
        className="absolute z-10 right-1 top-1.5"
        title="Borrar busqueda"
        onClick={handleClean}
      >
        <FaRegCircleXmark />
      </IconButton>
    </Search>
  );
}
