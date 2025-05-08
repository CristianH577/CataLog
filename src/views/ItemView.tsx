import { useEffect, useState } from "react";

import { titleColor } from "../libs/tvs";

import { Divider } from "@mui/material";

import { findItemImgs } from "../libs/functions";
import { useLocation } from "react-router";
import { DB_ITEMS } from "../consts/databases";

import TablePrices from "./ItemView/TablePrices";
import { ITEM_DATA_DEFAULT } from "../consts/siteConfig";
import ImagesSection from "./ItemView/ImagesSection";
import { ItemData, TypeObjectGeneral } from "../consts/types";

export default function ItemView() {
  const { search } = useLocation();

  const [itemData, setItemData] = useState({ ...ITEM_DATA_DEFAULT });

  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const paramsObj: TypeObjectGeneral = {};
      Array.from(params.entries()).map(([k, v]) => (paramsObj[k] = v));

      if ("id" in paramsObj) {
        const find: ItemData | undefined = DB_ITEMS.find(
          (item) => item.id === Number(paramsObj.id)
        );
        if (find) {
          const srcs = findItemImgs(find.id);

          if (srcs) find.imgs = srcs;

          //@ts-ignore
          setItemData({ ...itemData, ...find });
        }
      }
    }
  }, [search]);

  return (
    <main className="gap-2 p-2 sm:p-4 max-w-3xl place-self-center">
      <h1
        className={`h- ps-4 pb-2 lg:pb-4 ${titleColor({
          color: "blue",
          size: "lg",
        })}`}
      >
        {itemData.label}
      </h1>

      <Divider />

      <ImagesSection imgs={itemData.imgs} />

      <Divider variant="middle" />

      <TablePrices itemData={itemData} />

      <Divider variant="middle" />

      <section className="p-2">
        <h2 className="font-semibold text-xl">Cacteristicas</h2>

        <ul>
          {Object.entries(itemData.info).map(([key, value]) => (
            <li key={key}>
              <span className="capitalize font-semibold">{key}</span>: {value}
            </li>
          ))}
        </ul>
      </section>

      <Divider variant="middle" />

      <section className="p-2">
        <h2 className="font-semibold text-xl">Descripcion</h2>

        <p>{itemData.description}</p>
      </section>
    </main>
  );
}
