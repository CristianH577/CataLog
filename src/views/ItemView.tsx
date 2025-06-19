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
    <main className="gap-2 p-2 sm:p-4 max-w-3xl place-self-center">
      <motion.h1
        variants={{
          hidden: { opacity: 0, x: "50%" },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        className={`ps-4 pb-2 ${titleColor({
          color: "blue",
          size: "lg",
        })}`}
      >
        {itemData.label}
      </motion.h1>

      <Divider />

      <ImagesSection imgs={itemData.imgs} />

      <Divider variant="middle" />

      <TablePrices itemData={itemData} />

      <Divider variant="middle" />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-2"
      >
        <h2 className="font-semibold text-xl">Cacteristicas</h2>

        <ul>
          {itemData.info &&
            Object.entries(itemData.info).map(([key, value]) => (
              <li key={key}>
                <span className="capitalize font-semibold">{key}</span>: {value}
              </li>
            ))}
        </ul>
      </motion.section>

      <Divider variant="middle" />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-2"
      >
        <h2 className="font-semibold text-xl">Descripcion</h2>

        <p>{itemData.description}</p>
      </motion.section>
    </main>
  );
}
