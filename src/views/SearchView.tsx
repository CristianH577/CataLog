import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import SearchInput from "../components/SearchInput";

import { FILTERS_VALUES_DEFAULT } from "../consts/siteConfig";
import { DB_ITEMS } from "../consts/databases";
import { TypeFilterValues, ItemData, TypeObjectGeneral } from "../consts/types";

import {
  cartItemsComparator,
  findItemImgs,
  getHrefSearch,
} from "../libs/functions";

import { Button, ButtonGroup } from "@mui/material";

import DrawerFilters from "./SearchView/DrawerFilters";
import ItemsView from "./SearchView/ItemsView";

import { FaFilter } from "react-icons/fa";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const DB_ITEMS_ = DB_ITEMS.map((item: ItemData) => {
  item.img = findItemImgs(item.id)[0];

  return item;
});

const itemsPerView = 6;

export default function SearchView() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState<ItemData[]>([]);
  const [filtersValues, setFiltersValues] = useState<TypeFilterValues>(
    FILTERS_VALUES_DEFAULT
  );
  const [openDrawerFilters, setOpenDrawerFilters] = useState(false);
  const [visibleItems, setVisibleItems] = useState<ItemData[]>([]);

  const searhItems = () => {
    let items_ = structuredClone(DB_ITEMS_);

    if (filtersValues?.categorie) {
      items_ = items_.filter((item) => {
        const categorie = filtersValues.categorie;
        if (categorie === "otros") {
          return item.categoria === categorie || !item?.categoria;
        } else {
          return item.categoria === categorie;
        }
      });
    }

    ["marca", "medidas"].forEach((filterKey) => {
      if (filtersValues?.[filterKey as keyof typeof filtersValues]) {
        const filter_value = String(
          filtersValues[filterKey as keyof typeof filtersValues]
        ).toLowerCase();
        items_ = items_.filter(
          (item) =>
            item.info &&
            item.info[filterKey] &&
            String(item.info[filterKey]).toLowerCase().includes(filter_value)
        );
      }
    });

    if (filtersValues?.priceMin) {
      const min = Number(filtersValues?.priceMin);
      items_ = items_.filter((item) => {
        return Number(item.price) >= min;
      });
    }
    if (filtersValues?.priceMax) {
      const max = Number(filtersValues?.priceMax);
      items_ = items_.filter((item) => {
        return Number(item.price) <= max;
      });
    }

    if (filtersValues?.text) {
      const text_ = filtersValues.text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      items_ = items_.filter((item) =>
        JSON.stringify(item)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(text_.toLowerCase())
      );
    }

    if (filtersValues?.orderBy) {
      const [col, order] = filtersValues.orderBy.split("-");
      items_.sort(cartItemsComparator(col, order));
    }

    setItems(items_);
    setVisibleItems(items_.slice(0, itemsPerView * filtersValues.page));
  };

  const handleSearchInputChange = (text: string) => {
    const filters_values_ = structuredClone(filtersValues);
    filters_values_.text = text;
    setFiltersValues(filters_values_);
  };

  const showMoreItems = () => {
    let href = getHrefSearch(filtersValues);
    if (href) {
      href += "&";
    } else {
      href += "?";
    }
    href += "page=" + (Number(filtersValues.page) + 1);
    navigate(href);
  };

  useEffect(() => {
    const filters_values_ = structuredClone(FILTERS_VALUES_DEFAULT);
    if (search) {
      const params = new URLSearchParams(search);
      const paramsObj: TypeObjectGeneral = {};
      Array.from(params.entries()).map(
        ([k, v]) => (paramsObj[k] = v.replace(/%/g, " "))
      );

      Object.keys(paramsObj).forEach((key) => {
        if (filters_values_.hasOwnProperty(key)) {
          // @ts-ignore
          filters_values_[key] = paramsObj[key];
          filters_values_.apply = true;
        }
      });
    }

    setFiltersValues(filters_values_);
  }, [search]);

  useEffect(searhItems, [filtersValues]);

  return (
    <main className="self-center items-center pt-8 px-2 sm:px-4 gap-4 w-full !max-w-[1400px]">
      <article className="flex items-center gap-2">
        <SearchInput
          className="border-2 border-neutral-300 hover:border-neutral-400"
          inputValue={filtersValues.text}
          setInputValue={handleSearchInputChange}
        />

        <ButtonGroup variant="contained">
          <Button
            color="inherit"
            href="#search"
            title="Quitar filtros"
            sx={{
              paddingLeft: "0",
              paddingRight: "0",
              minWidth: "2.5rem",
            }}
          >
            <FilterAltOffIcon />
          </Button>

          <Button
            color={filtersValues.apply ? "warning" : "inherit"}
            title="Abrir filtros"
            sx={{
              paddingLeft: "0",
              paddingRight: "0",
              minWidth: "2.5rem",
            }}
            onClick={() => setOpenDrawerFilters(true)}
          >
            <FaFilter className="w-5 h-fit" />
          </Button>
        </ButtonGroup>

        <DrawerFilters
          isOpen={openDrawerFilters}
          setIsOpen={setOpenDrawerFilters}
          filtersValues={filtersValues}
        />
      </article>

      <p className="text-sm text-neutral-400 text-center">
        Total: {items.length}
        <br />
        Los precios pueden no estar actualizados.
      </p>

      {items.length < 1 ? (
        <div className="font-bold text-center w-full text-3xl">
          Sin resultados
        </div>
      ) : (
        <ItemsView
          items={visibleItems}
          totalItems={items.length}
          showMoreItems={showMoreItems}
        />
      )}
    </main>
  );
}
