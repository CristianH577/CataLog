import { ChangeEvent, useState } from "react";

import {
  FILTERS_INPUTS,
  FILTERS_VALUES_DEFAULT,
} from "../../consts/siteConfig";
import { TypeFilterValues, TypeInputFilter } from "../../consts/types";

import { titleColor } from "../../libs/tvs";

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
  SelectChangeEvent,
} from "@mui/material";

import { IoIosCloseCircleOutline } from "react-icons/io";

export default function DrawerFilters({
  openDrawer = false,
  handleOpen = () => {},
  filtersValues = {},
  //@ts-ignore
  setFiltersValues = (val: TypeFilterValues) => {},
}) {
  const [filtersValuesTemp, setFiltersValuesTemp] = useState<TypeFilterValues>({
    ...FILTERS_VALUES_DEFAULT,
    ...filtersValues,
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filters_values = structuredClone(filtersValuesTemp);
    const name = e.target.name as keyof TypeFilterValues;
    const value = e.target.value;
    const type = e.target.type;

    if (type === "number") {
      const [name_, key] = name.split("-");
      //@ts-ignore
      filters_values[name_][key] = Number(value);
    } else {
      //@ts-ignore
      filters_values[name as keyof TypeFilterValues] = value;
    }

    setFiltersValuesTemp(filters_values);
  };

  const handleSelectFilterChange = (e: SelectChangeEvent<any>) => {
    const filters_values = structuredClone(filtersValuesTemp);
    const name = e.target.name as keyof TypeFilterValues;
    const value = e.target.value;

    //@ts-ignore
    filters_values[name] = value;

    setFiltersValuesTemp(filters_values);
  };

  const handleApply = () => {
    const fvt = structuredClone(filtersValuesTemp);
    const fvd = structuredClone(FILTERS_VALUES_DEFAULT);

    //@ts-ignore
    delete fvt.apply;
    //@ts-ignore
    delete fvd.apply;

    const isApply = JSON.stringify(fvt) !== JSON.stringify(fvd);
    filtersValuesTemp.apply = isApply;

    setFiltersValues(structuredClone(filtersValuesTemp));
    handleOpen();
  };

  const handleClean = () => {
    setFiltersValuesTemp(structuredClone(FILTERS_VALUES_DEFAULT));
    setFiltersValues(structuredClone(FILTERS_VALUES_DEFAULT));
    handleOpen();
  };

  const makeInput = (input: TypeInputFilter) => {
    const id = `${input.format}-${input.id}`;
    const labelId = `${id}-label`;
    switch (input.format) {
      case "select":
        return (
          <FormControl fullWidth variant="standard">
            <InputLabel id={labelId}>{input.label}</InputLabel>

            <Select
              labelId={labelId}
              id={id}
              label={input.id}
              name={input.id}
              //@ts-ignore
              value={filtersValuesTemp[input.id]}
              onChange={handleSelectFilterChange}
            >
              <MenuItem value="">Seleccione un valor</MenuItem>

              {input.items &&
                input.items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        );
      case "number":
        return (
          <div>
            <InputLabel>{input.label}</InputLabel>

            <div className="xs:flex gap-1">
              {["min", "max"].map((key) => (
                <TextField
                  key={key}
                  type="number"
                  className="capitalize"
                  variant="standard"
                  id={`input-${input.id}-${key}`}
                  label={key}
                  name={`${input.id}-${key}`}
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
            id={id}
            label={input.label}
            variant="standard"
            name={input.id}
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
          <span className={titleColor({ color: "blue" })}>Filtros</span>

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
