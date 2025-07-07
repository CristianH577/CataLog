import { ChangeEvent, Fragment, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import {
  ItemData,
  TypeColumnTable,
  TypeContext,
  TypeObjectGeneral,
} from "../consts/types";

import {
  cartItemsComparator,
  scrollTop,
  toPriceFormat,
} from "../libs/functions";
import { titleColor } from "../libs/tvs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTableToolbar from "./CartView/EnhancedTableToolbar";
import { TextField } from "@mui/material";

import ButtonContinueWp from "./CartView/ButtonContinueWp";
import EnhancedTableHead from "./CartView/EnhancedTableHead";
import ImageCustom from "../components/ImageCustom";

type TypeOrder = "asc" | "desc" | undefined;

const cols: TypeColumnTable[] = [
  {
    id: "img",
    numeric: false,
    label: "",
  },
  {
    id: "categoria",
    numeric: false,
    label: "Categoria",
  },
  {
    id: "label",
    numeric: false,
    label: "Nombre",
  },
  {
    id: "medidas",
    numeric: false,
    label: "Medida/s",
  },
  {
    id: "marca",
    numeric: false,
    label: "Marca",
  },
  {
    id: "qtt",
    numeric: true,
    label: "Cantidad",
  },
  {
    id: "price",
    numeric: true,
    label: "Precio",
  },
  {
    id: "subtotal",
    numeric: true,
    label: "Subtotal",
  },
];

const MotionTableContainer = motion.create(TableContainer);
const MotionTableRow = motion.create(TableRow);

export default function CartView() {
  const context: TypeContext = useOutletContext();
  const rows = Object.values(context.cart.value);

  const [order, setOrder] = useState<TypeOrder>("asc");
  const [colOrder, setColOrder] = useState<keyof ItemData>("label");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleRequestSort = (col: keyof ItemData) => {
    const isAsc = colOrder === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setColOrder(col);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRows = () => {
    const cart = structuredClone(context.cart.value);
    selected.forEach((id) => {
      if (id in cart) delete cart[id];
    });
    context.cart.set(cart);
    setSelected([]);
  };

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(cartItemsComparator(colOrder, String(order)))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, colOrder, page, rowsPerPage, context.cart.value]
  );

  //------------------------------
  const makeCell = (col: string, row: ItemData) => {
    const val = row[col as keyof ItemData] ?? "";
    const props: TypeObjectGeneral = {};
    let content = null;

    switch (col) {
      case "img":
        content = (
          <ImageCustom
            src={row.img || row?.imgs?.[0] || ""}
            alt={"Preview de " + row.label}
            className="rounded-lg drop-shadow-md h-full min-w-20 max-h-24 object-contain"
            width={165}
            height={96}
          />
        );
        break;
      case "label":
        props.id = `enhanced-table-checkbox-`;
        break;
      case "categoria":
        props.className = "capitalize";
        break;
      case "marca":
      case "medidas":
        content = row?.info?.[col];
        break;
      case "price":
        content = toPriceFormat(row?.price);
        break;
      case "subtotal":
        const subtotal = Number(row?.price) * Number(row?.qtt);
        content = toPriceFormat(subtotal);
        break;
      case "qtt":
        content = (
          <TextField
            type="number"
            name={`qtt-${row?.id}`}
            size="small"
            label="Cantidad"
            className="w-28"
            value={val}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeQtt(Number(e.target.value), row.id)
            }
          />
        );
        break;

      default:
        content = String(val);
        break;
    }

    return (
      <TableCell
        {...props}
        padding="normal"
        style={{ fontFamily: "monserrat" }}
      >
        {content || String(val) || "-"}
      </TableCell>
    );
  };

  const handleChangeQtt = (qtt: number, id: number) => {
    const cart_ = structuredClone(context.cart.value);
    cart_[id].qtt = qtt;

    if (cart_[id]?.prices) {
      let price = 0;
      for (const umin in cart_[id].prices) {
        if (qtt >= Number(umin)) {
          price = cart_[id].prices[umin];
        } else {
          break;
        }
      }
      cart_[id].price = price;
    }

    context.cart.set(cart_);
  };

  useEffect(() => {
    let total_ = 0;
    Object.values(context.cart.value).forEach(
      (row) => (total_ += Number(row?.price) * Number(row?.qtt))
    );

    setTotal(total_);
  }, [context.cart.value]);

  useEffect(scrollTop, [page]);

  return (
    <main className="py-2 sm:py-6">
      <section
        className="flex flex-col lg:max-w-[1200px] lg:self-center"
        style={{
          minHeight: 190 + rowsPerPage * 53 + "px",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteRows={handleDeleteRows}
        />

        <MotionTableContainer
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.5,
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="flex-grow"
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="Tabla de articulos">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderCol={colOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              cols={cols}
            />

            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.id);

                return (
                  <MotionTableRow
                    key={row.id}
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        name={`check-${row.id}`}
                        color="primary"
                        checked={isItemSelected}
                        onClick={() => handleClick(row.id)}
                      />
                    </TableCell>

                    {cols.map((col) => (
                      <Fragment key={col.id}>{makeCell(col.id, row)}</Fragment>
                    ))}
                  </MotionTableRow>
                );
              })}

              {!rows.length && (
                <TableRow>
                  <TableCell
                    colSpan={cols.length + 1}
                    className="font-semibold"
                  >
                    Sin elementos para mostrar
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </MotionTableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por pagina"
        />

        <article className="px-2 sm:px-4 flex flex-col items-end gap-4">
          <div
            className={`${titleColor({
              color: "yellow",
            })}`}
          >
            Total {toPriceFormat(total)}
          </div>

          <ButtonContinueWp cart={context.cart.value} />
        </article>
      </section>
    </main>
  );
}
