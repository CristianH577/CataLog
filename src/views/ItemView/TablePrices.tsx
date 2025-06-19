import { ChangeEvent, useState } from "react";
import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import { ItemData, TypeContext } from "../../consts/types";

import { toPriceFormat } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";

import ButtonCart from "../../components/ButtonCart";

const cols = [
  { id: "qtt", label: "Cantidad(U)" },
  { id: "price", label: "Precio(xU)" },
  { id: "subtotal", label: "Subtotal" },
  { id: "panel", label: "" },
];

type TypeITablePricesProps = {
  itemData: ItemData;
};

const MotionTableContainer = motion.create(TableContainer);
const MotionTableRow = motion.create(TableRow);

export default function TablePrices({ itemData }: TypeITablePricesProps) {
  const context: TypeContext = useOutletContext();
  const cart = context.cart.value;
  const inCartGlobal = itemData.id in cart;
  const qttCart = inCartGlobal ? cart[itemData.id].qtt : 0;

  const [qttFix, setQttFix] = useState(0);
  const [count, setCount] = useState(0);

  const handleChangeQttFix = (e: ChangeEvent<HTMLInputElement>) => {
    let qtt = Number(e.target.value);
    if (qtt < 0) qtt = 0;

    setQttFix(qtt);
  };
  const handleBlurQttFix = () => {
    if (itemData?.prices) {
      let price = 0;
      for (const umin in itemData.prices) {
        if ((qttFix || 1) >= Number(umin)) {
          price = itemData.prices[umin];
        } else {
          break;
        }
      }
      itemData.price = price;
    }

    setCount(count + 1);
  };

  const handleButtonInputCart = () => {
    let qtt_ = 0;
    if (qttFix) {
      if (qttFix !== qttCart) qtt_ = qttFix;
    } else {
      if (!inCartGlobal) qtt_ = 1;
    }

    itemData.qtt = qtt_;

    if (qtt_ === 0) {
      itemData.price = itemData.prices ? itemData.prices[1] : 0;
    }

    setQttFix(qtt_);
    context?.cart?.add(itemData);
  };

  const makeCell = (col: string, qtt: number, price: number) => {
    switch (col) {
      case "qtt":
        return qtt;
      case "price":
        return toPriceFormat(price);
      case "subtotal":
        return toPriceFormat(qtt * price);
      case "panel":
        const inCart_ = inCartGlobal && qttCart === qtt;
        return (
          <ButtonCart
            inCart={inCart_}
            action={() => {
              let qtt_ = 0;
              if (!inCart_) qtt_ = qtt;
              itemData.qtt = qtt_;
              itemData.price = itemData.prices ? itemData.prices[qtt_ || 1] : 0;

              setQttFix(qtt_);
              context.cart.add(itemData);
            }}
          />
        );

      default:
        return "-";
    }
  };

  return (
    <section className="self-center sm:self-end space-y-2 py-2">
      <motion.article
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: {
            opacity: 1,
            x: 0,
          },
        }}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-2 justify-center items-end sm:gap-4"
      >
        <span
          className={`${titleColor({
            color: "yellow",
            size: "lg",
          })} `}
        >
          {toPriceFormat(itemData.price)}
        </span>

        <div className="flex gap-3 justify-center items-center">
          <TextField
            type="number"
            size="small"
            label="Cantidad"
            className="max-w-36"
            value={qttFix || ""}
            onChange={handleChangeQttFix}
            onBlur={handleBlurQttFix}
          />
          <ButtonCart inCart={inCartGlobal} action={handleButtonInputCart} />
        </div>
      </motion.article>

      {itemData.prices ? (
        <MotionTableContainer
          variants={{
            hidden: { opacity: 0, scaleY: 0 },
            visible: {
              opacity: 1,
              scaleY: 1,
              transition: {
                delayChildren: 0.5,
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="table-dinamic overflow-y-hidden"
        >
          <Table
            size="small"
            aria-label="Tabla de precios"
            className="max-sm:border-separate border-spacing-y-2"
          >
            <TableHead>
              <TableRow>
                {cols.map((col) => (
                  <TableCell key={col.id} component="th" className="font-bold">
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody className="xs:flex flex-wrap gap-4 justify-center sm:table-row-group">
              {Object.entries(itemData.prices).map(([qtt, price]) => (
                <MotionTableRow
                  key={qtt}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="max-sm:bg-blue-400/20 sm:hover:bg-violet-500/20"
                >
                  {cols.map((col) => (
                    <TableCell
                      key={col.id + "-" + qtt}
                      className="first:font-bold"
                      data-label={col.label}
                    >
                      {makeCell(col.id, Number(qtt), price)}
                    </TableCell>
                  ))}
                </MotionTableRow>
              ))}
            </TableBody>
          </Table>
        </MotionTableContainer>
      ) : (
        <motion.div
          initial={{ height: 230 }}
          animate={{ height: 0 }}
          className="opacity-0"
        ></motion.div>
      )}
    </section>
  );
}
