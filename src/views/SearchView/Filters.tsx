import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import {
  FILTERS_INPUTS,
  FILTERS_VALUES_DEFAULT,
} from "../../consts/siteConfig";
import { TypeFilterValues, TypeFiltersInput } from "../../consts/types";

import { getHrefSearch } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";

import {
  Divider,
  List,
  ListItem,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

interface InterfaceProps {
  id?: string;
  filtersValues: TypeFilterValues;
  onAction?: () => void;
}

const MotionListItem = motion.create(ListItem);
const MotionButton = motion.create(Button);

export default function Filters({
  id,
  filtersValues,
  onAction,
}: InterfaceProps) {
  const navigate = useNavigate();

  const [filtersValuesTemp, setFiltersValuesTemp] = useState<TypeFilterValues>(
    FILTERS_VALUES_DEFAULT
  );

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filters_values_ = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    const value_ = type === "number" ? value : Number(value);

    // @ts-ignore
    filters_values_[name] = value_;

    setFiltersValuesTemp(filters_values_);
  };

  const handleSelectFilterChange = (e: SelectChangeEvent<any>) => {
    const filters_values = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    const value = e.target.value;

    // @ts-ignore
    filters_values[name] = value;

    setFiltersValuesTemp(filters_values);
  };

  const handleApply = () => {
    let href = getHrefSearch(filtersValuesTemp);
    navigate(href);
    onAction && onAction();
  };

  const handleClean = () => {
    setFiltersValuesTemp(structuredClone(FILTERS_VALUES_DEFAULT));
    onAction && onAction();
  };

  const makeInput = (input: TypeFiltersInput) => {
    const id_ = `${id ? id + "-" : ""}${input.format}-${input.id}`;
    const id_label = `${id_}-label`;
    switch (input.format) {
      case "select":
        return (
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor={id_label}>{input.label}</InputLabel>

            <Select
              id={id_}
              label={input.label}
              name={input.id}
              value={filtersValuesTemp[input.id as keyof TypeFilterValues]}
              onChange={handleSelectFilterChange}
              inputProps={{
                id: id_label,
              }}
            >
              <MenuItem value="">Quitar</MenuItem>

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
            <p className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-animated css-1tkmop-MuiFormLabel-root-MuiInputLabel-root">
              {input.label}
            </p>

            <div className="xs:flex gap-1">
              {["Min", "Max"].map((key) => {
                const key_ = input.id + key;
                const value = filtersValuesTemp[key_ as keyof TypeFilterValues];
                return (
                  <TextField
                    key={key}
                    type="number"
                    className="capitalize"
                    variant="standard"
                    label={key}
                    name={`${input.id}-${key}`}
                    value={value ? String(value) : ""}
                    onChange={handleFilterChange}
                  />
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <TextField
            id={id_}
            label={input.label}
            variant="standard"
            name={input.id}
            value={filtersValuesTemp[input.id as keyof TypeFilterValues] ?? ""}
            onChange={handleFilterChange}
          />
        );
    }
  };

  useEffect(() => {
    const filters_values_ = { ...filtersValuesTemp, ...filtersValues };

    setFiltersValuesTemp(filters_values_);
  }, [filtersValues]);

  return (
    <motion.section
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
    >
      <header className="p-4">
        <motion.h1
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className={titleColor({ color: "blue" })}
        >
          Filtros
        </motion.h1>
      </header>

      <Divider variant="middle" />

      <List className="w-full xs:max-w-64 pb-4">
        {FILTERS_INPUTS.map((input) => (
          <MotionListItem
            key={input.id}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {makeInput(input)}
          </MotionListItem>
        ))}
      </List>

      <Divider variant="middle" />

      <footer className="py-4 px-2 flex flex-col xs:flex-row flex-wrap justify-end gap-2">
        <MotionButton
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          variant="contained"
          color="inherit"
          href="#search?orderBy=price-asc"
          title="Quitar filtros"
          onClick={handleClean}
        >
          <FilterAltOffIcon />
        </MotionButton>

        <MotionButton
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          variant="contained"
          title="Aplicar filtros"
          onClick={handleApply}
        >
          Aplicar
        </MotionButton>
      </footer>
    </motion.section>
  );
}
