import SearchInput from "../layout/NavBar/SearchInput";

import { cartItemsComparator, findItemImgs } from "../libs/functions";
import { DB_ITEMS } from "../consts/databases";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { IconButton } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import DrawerFilters from "./SearchView/DrawerFilters";
import ItemsView from "./SearchView/ItemsView";
import {
  FILTERS_VALUES_DEFAULT,
  ITEM_DATA_DEFAULT,
} from "../consts/siteConfig";
import {
  TypeFilterValues,
  ItemData,
  TypeObjectGeneral,
  TypeOrder,
} from "../consts/types";

const DB_ITEMS_ = DB_ITEMS.map((item: ItemData) => {
  item.img = findItemImgs(item.id)[0];

  if (!item?.price) {
    let price = Math.random() * 1000;
    if (item?.prices) {
      price = item.prices[1];
    } else {
      price = Math.random() * 1000;
    }
    item.price = price;
  }

  if (!item?.description) item.description = ITEM_DATA_DEFAULT.description;

  return item;
});

export default function SearchView() {
  const { search } = useLocation();

  const [items, setItems] = useState<ItemData[]>([]);
  const [openDrawerFilters, setOpenDrawerFilters] = useState(false);
  const [filtersValues, setFiltersValues] = useState<TypeFilterValues>(
    FILTERS_VALUES_DEFAULT
  );

  const handleOpenDrawerFilters = () => {
    setOpenDrawerFilters(!openDrawerFilters);
  };

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
            item?.info &&
            item.info?.[filterKey] &&
            item.info[filterKey].toLowerCase().includes(filter_value)
        );
      }
    });

    if (filtersValues?.price?.min || filtersValues?.price?.max) {
      const min = Number(filtersValues?.price?.min);
      const max = Number(filtersValues?.price?.max);
      items_ = items_.filter(
        (item) =>
          (min && Number(item.price) >= min) ||
          (max && Number(item.price) <= max)
      );
    }

    if (filtersValues?.text) {
      items_ = items_.filter((item) =>
        JSON.stringify(item)
          .toLowerCase()
          .includes(filtersValues.text.toLowerCase())
      );
    }

    if (filtersValues?.orderBy && filtersValues.orderBy !== "id-asc") {
      const [col, order] = filtersValues.orderBy.split("-") as [
        string,
        TypeOrder
      ];
      items_.sort(cartItemsComparator(col, order));
    }

    setItems(items_);
  };

  const handleSearchInputChange = (text: string) => {
    const filters_values_ = structuredClone(filtersValues);
    filters_values_.text = text;
    setFiltersValues(filters_values_);
  };

  //paginacion
  const [totalVisibleItems, setTotalVisibleItems] = useState(10);
  const visibleItems = items.slice(0, totalVisibleItems);

  const showMoreItems = () => {
    setTotalVisibleItems(totalVisibleItems + 10);
  };

  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const paramsObj: TypeObjectGeneral = {};
      Array.from(params.entries()).map(([k, v]) => (paramsObj[k] = v));

      if ("text" in paramsObj) {
        const filters_values_ = structuredClone(filtersValues);
        filters_values_.text = String(paramsObj.text);

        setFiltersValues(filters_values_);
      }
    }
  }, [search]);

  useEffect(searhItems, [filtersValues]);

  return (
    <main className="items-center pt-8 px-2 sm:px-4 gap-4 w-full">
      <article className="flex items-center gap-2">
        <SearchInput
          className="border-2 border-neutral-300 hover:border-neutral-400"
          inputValue={filtersValues.text}
          setInputValue={handleSearchInputChange}
        />

        <IconButton
          color={filtersValues.apply ? "warning" : "default"}
          onClick={handleOpenDrawerFilters}
        >
          <FaFilter />
        </IconButton>

        <DrawerFilters
          openDrawer={openDrawerFilters}
          handleOpen={handleOpenDrawerFilters}
          filtersValues={filtersValues}
          setFiltersValues={setFiltersValues}
        />
      </article>

      <p className="text-sm text-neutral-400">
        Los precios pueden no estar actualizados
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
