import SearchInput from "../layout/NavBar/SearchInput";

import { cartItemsComparator, findItemImgs } from "../libs/functions";
import { DB_ITEMS } from "../consts/databases";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { IconButton } from "@mui/material";
import { FaFilter } from "react-icons/fa";
import DrawerFilters from "./SearchView/DrawerFilters";
import ItemsView from "./SearchView/ItemsView";
import { itemDataDefault } from "../consts/siteConfig";

const DB_ITEMS_ = DB_ITEMS.map((item) => {
  //@ts-ignore
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

  if (!item?.description) item.description = itemDataDefault.description;

  return item;
});

export default function SearchView() {
  const { search } = useLocation();

  const [items, setItems] = useState([]);
  const [openDrawerFilters, setOpenDrawerFilters] = useState(false);
  const [filtersValues, setFiltersValues] = useState({});

  const handleOpenDrawerFilters = () =>
    setOpenDrawerFilters(!openDrawerFilters);

  const searhItems = () => {
    let items_ = structuredClone(DB_ITEMS_);

    //@ts-ignore
    if (filtersValues?.categorie) {
      items_ = items_.filter((item) => {
        //@ts-ignore
        const categorie = filtersValues.categorie;
        if (categorie === "otros") {
          return item.categoria === categorie || !item?.categoria;
        } else {
          return item.categoria === categorie;
        }
      });
    }

    ["marca", "medidas"].forEach((filterKey) => {
      //@ts-ignore
      if (filtersValues?.[filterKey]) {
        //@ts-ignore
        const filter_value = filtersValues[filterKey];
        items_ = items_.filter(
          //@ts-ignore
          (item) =>
            //@ts-ignore
            item?.info?.[filterKey] &&
            //@ts-ignore
            item.info[filterKey]
              .toLowerCase()
              .includes(filter_value.toLowerCase())
        );
      }
    });

    //@ts-ignore
    if (filtersValues?.price?.min || filtersValues?.price?.max) {
      //@ts-ignore
      const min = filtersValues?.price?.min;
      //@ts-ignore
      const max = filtersValues?.price?.max;
      items_ = items_.filter(
        (item) =>
          //@ts-ignore
          (min && item.price >= min) || (max && item.price <= max)
      );
    }

    //@ts-ignore
    if (filtersValues?.text) {
      items_ = items_.filter((item) =>
        //@ts-ignore
        JSON.stringify(item).toLowerCase().includes(filtersValues.text)
      );
    }

    //@ts-ignore
    if (filtersValues?.orderBy && filtersValues.orderBy !== "id-asc") {
      //@ts-ignore
      const [col, order] = filtersValues.orderBy.split("-");
      //@ts-ignore
      items_.sort(cartItemsComparator(col, order));
    }

    //@ts-ignore
    setItems(items_);
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
      const paramsObj = {};
      //@ts-ignore
      Array.from(params.entries()).map(([k, v]) => (paramsObj[k] = v));

      if ("text" in paramsObj) {
        //@ts-ignore
        setFiltersValues({ ...filtersValues, text: paramsObj.text });
      }
    }
  }, [search]);

  useEffect(searhItems, [filtersValues]);

  return (
    <main className="items-center pt-8 px-2 sm:px-4 gap-4 w-full">
      <article className="flex items-center gap-2">
        <SearchInput
          className="border-2 border-neutral-300 hover:border-neutral-400"
          //@ts-ignore
          inputValue={filtersValues?.text}
          //@ts-ignore
          setInputValue={(text) => {
            setFiltersValues({ ...filtersValues, text: text });
          }}
        />

        <IconButton
          color={
            //@ts-ignore
            filtersValues?.apply ? "warning" : "default"
          }
          onClick={handleOpenDrawerFilters}
        >
          <FaFilter />
        </IconButton>

        <DrawerFilters
          openDrawer={openDrawerFilters}
          handleOpen={handleOpenDrawerFilters}
          filtersValues={filtersValues}
          //@ts-ignore
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
          //@ts-ignore
          items={visibleItems}
          totalItems={items.length}
          showMoreItems={showMoreItems}
        />
      )}
    </main>
  );
}
