import { FILTERS_INPUTS } from "../../consts/siteConfig";

import {
  Box,
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
  IconButton,
  Button,
} from "@mui/material";

import { IoIosCloseCircleOutline } from "react-icons/io";

import { titleColor } from "../../libs/tvs";
import { useState } from "react";

export default function DrawerFilters({
  openDrawer = false,
  handleOpen = () => {},
  filtersValues = {},
  setFiltersValues = null,
}) {
  const filters_values_default = {
    apply: false,
    orderBy: "id-asc",
    text: "",
    categorie: "",
    marca: "",
    medidas: "",
    price: {
      min: "",
      max: "",
    },
  };
  const [filtersValuesTemp, setFiltersValuesTemp] = useState({
    ...filters_values_default,
    ...filtersValues,
  });

  //@ts-ignore
  const handleFilterChange = (e) => {
    const filters_values = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    if (type === "number") {
      const [name_, key] = name.split("-");
      //@ts-ignore
      filters_values[name_][key] = Number(value);
    } else {
      //@ts-ignore
      filters_values[name] = value;
    }

    setFiltersValuesTemp(filters_values);
  };

  const handleApply = () => {
    const fvt = structuredClone(filtersValuesTemp);
    const fvd = structuredClone(filters_values_default);

    //@ts-ignore
    delete fvt.apply;
    //@ts-ignore
    delete fvd.apply;

    const isApply = JSON.stringify(fvt) !== JSON.stringify(fvd);
    //@ts-ignore
    filtersValuesTemp.apply = isApply;

    //@ts-ignore
    setFiltersValues && setFiltersValues(structuredClone(filtersValuesTemp));
    handleOpen();
  };

  const handleClean = () => {
    setFiltersValuesTemp(structuredClone(filters_values_default));

    setFiltersValues &&
      //@ts-ignore
      setFiltersValues(structuredClone(filters_values_default));

    handleOpen();
  };

  const makeInput = (input: Object) => {
    //@ts-ignore
    switch (input.format) {
      case "select":
        return (
          <FormControl fullWidth variant="standard">
            <InputLabel
              id={
                //@ts-ignore
                `select-label-${input.id}`
              }
            >
              {
                //@ts-ignore
                input.label
              }
            </InputLabel>

            <Select
              labelId={`select-label-${
                //@ts-ignore
                input.id
              }`}
              id={`select-${
                //@ts-ignore
                input.id
              }`}
              //@ts-ignore
              label={input.id}
              name={
                //@ts-ignore
                input.id
              }
              value={
                //@ts-ignore
                filtersValuesTemp[input.id]
              }
              //@ts-ignore
              onChange={handleFilterChange}
            >
              <MenuItem value="">Seleccione un valor</MenuItem>
              {
                //@ts-ignore
                input.items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        );
      case "number":
        return (
          <div>
            <InputLabel
              id={
                //@ts-ignore
                `input-label-${input.id}`
              }
            >
              {
                //@ts-ignore
                input.label
              }
            </InputLabel>
            <div className="xs:flex gap-1">
              {["min", "max"].map((key) => (
                <TextField
                  key={key}
                  type="number"
                  className="capitalize"
                  id={
                    //@ts-ignore
                    `input-${input.id}-${key}`
                  }
                  label={key}
                  variant="standard"
                  name={
                    //@ts-ignore
                    `${input.id}-${key}`
                  }
                  value={
                    //@ts-ignore
                    filtersValuesTemp[input.id][key] || ""
                  }
                  onChange={handleFilterChange}
                />
              ))}
            </div>
          </div>
        );

      default:
        return (
          <TextField
            id={
              //@ts-ignore
              `input-${input.id}`
            }
            label={
              //@ts-ignore
              input.label
            }
            variant="standard"
            name={
              //@ts-ignore
              input.id
            }
            value={
              //@ts-ignore
              filtersValuesTemp[input.id]
            }
            onChange={handleFilterChange}
          />
        );
    }
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={openDrawer}
      onClose={handleOpen}
      onOpen={handleOpen}
      variant="temporary"
    >
      <Box sx={{ width: 220 }} role="presentation">
        <div className="px-4 py-2 relative">
          <span className={`${titleColor({ color: "blue" })}`}>Filtros</span>

          <IconButton className="absolute top-1.5 right-2" onClick={handleOpen}>
            <IoIosCloseCircleOutline />
          </IconButton>
        </div>

        <Divider variant="middle" />

        <List>
          {FILTERS_INPUTS.map((input) => (
            <ListItem key={input.id}>{makeInput(input)}</ListItem>
          ))}
        </List>
      </Box>

      <Divider variant="middle" />

      <div className="p-2 flex flex-col xs:flex-row flex-wrap justify-end gap-2">
        <Button variant="contained" color="inherit" onClick={handleClean}>
          Limpiar
        </Button>

        <Button variant="contained" onClick={handleApply}>
          Aplicar
        </Button>
      </div>
    </SwipeableDrawer>
  );
}
