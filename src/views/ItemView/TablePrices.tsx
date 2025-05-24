import { ChangeEvent, useState } from "react";
import { useOutletContext } from "react-router";

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

export default function TablePrices({ itemData }: TypeITablePricesProps) {
  const context: TypeContext = useOutletContext();
  const cart = context.cart.value;
  const inCartGlobal = itemData.id in cart;
  const qttCart = inCartGlobal ? cart[itemData.id].qtt : 0;

  const [qttFix, setQttFix] = useState(0);

  const handleChangeQttFix = (e: ChangeEvent<HTMLInputElement>) => {
    const qtt = Number(e.target.value);

    if (itemData?.prices) {
      let price = 0;
      for (const umin in itemData.prices) {
        if (qtt >= Number(umin)) {
          price = itemData.prices[umin];
        } else {
          break;
        }
      }
      itemData.price = price;
    }

    setQttFix(qtt);
  };

  const handleButtonInputCart = () => {
    let qtt_ = 0;
    if (qttFix) {
      if (qttFix !== qttCart) qtt_ = qttFix;
    } else {
      if (!inCartGlobal) qtt_ = 1;
    }

    itemData.qtt = qtt_;

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
              itemData.price = itemData.prices ? itemData.prices[qtt] : 0;

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
      <article className="flex flex-col gap-2 justify-center items-end sm:gap-4">
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
          />
          <ButtonCart inCart={inCartGlobal} action={handleButtonInputCart} />
        </div>
      </article>
      {itemData?.prices && (
        <TableContainer className="table-dinamic">
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

            <TableBody>
              {Object.entries(itemData.prices).map(([qtt, price]) => (
                <TableRow
                  key={qtt}
                  className="max-sm:bg-blue-300/30 sm:hover:bg-violet-500/20"
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
