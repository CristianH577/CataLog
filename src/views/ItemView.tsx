import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

import { DB_ITEMS } from "../consts/databases";
import { ITEM_DATA_DEFAULT } from "../consts/siteConfig";
import { ItemData, TypeObjectGeneral } from "../consts/types";

import { titleColor } from "../libs/tvs";
import { findItemImgs } from "../libs/functions";

import { Divider } from "@mui/material";

import TablePrices from "./ItemView/TablePrices";
import ImagesSection from "./ItemView/ImagesSection";

export default function ItemView() {
  const { search } = useLocation();

  const [itemData, setItemData] = useState<ItemData>({ ...ITEM_DATA_DEFAULT });

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
          setItemData({ ...itemData, ...find });
        }
      }
    }
  }, [search]);

  return (
    <main className="gap-4 py-4 p-2 sm:px-4 max-w-2xl lg:max-w-[1200px] place-self-center grid grid-cols-1 lg:grid-cols-2 lg:row-span-2">
      <ImagesSection imgs={itemData.imgs} />

      <Divider variant="middle" className="sm:hidden" />

      <motion.section
        variants={{
          hidden: { opacity: 0, x: "50%" },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 items-center lg:items-start"
      >
        <h1
          className={`pb-2 ${titleColor({
            color: "blue",
            size: "lg",
          })}`}
        >
          {itemData.label}
        </h1>

        <TablePrices itemData={itemData} />
      </motion.section>

      {itemData.info && (
        <section className="col-span- space-y-4">
          <Divider variant="middle" />

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 items-center"
          >
            <h2 className="font-semibold text-xl">Cacteristicas</h2>

            <ul className="flex flex-wrap gap-4">
              {itemData.info &&
                Object.entries(itemData.info).map(([key, value]) => (
                  <li key={key}>
                    <span className="capitalize font-semibold">{key}</span>:{" "}
                    {value}
                  </li>
                ))}
            </ul>
          </motion.section>
        </section>
      )}

      {itemData.description && (
        <section className="col-span- space-y-4">
          <Divider variant="middle" />

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 items-center"
          >
            <h2 className="font-semibold text-xl">Descripción</h2>

            <p className="p-2">{itemData.description}</p>
          </motion.section>
        </section>
      )}
    </main>
  );
}
