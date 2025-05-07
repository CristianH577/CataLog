import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import {
  ChangeEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ItemData, HeadCell, Order } from "../consts/types";
import EnhancedTableToolbar from "./CartView/EnhancedTableToolbar";
import { useOutletContext } from "react-router";
import {
  cartItemsComparator,
  scrollTop,
  toPriceFormat,
} from "../libs/functions";
import { TextField } from "@mui/material";
import { titleColor } from "../libs/tvs";
import ButtonContinueWp from "./CartView/ButtonContinueWp";
import EnhancedTableHead from "./CartView/EnhancedTableHead";

const cols: readonly HeadCell[] = [
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

export default function CartView() {
  const context = useOutletContext();
  //@ts-ignore
  const rows = Object.values(context.cart.value);
  // const [rows, setRows] = useState(Object.values(context.cart.value));
  const [order, setOrder] = useState<Order>("asc");
  const [colOrder, setColOrder] = useState<keyof ItemData>("label");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof ItemData
  ) => {
    const isAsc = colOrder === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setColOrder(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      //@ts-ignore
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

  //@ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteRows = () => {
    //@ts-ignore
    const cart = structuredClone(context.cart.value);
    selected.forEach((id) => {
      if (id in cart) delete cart[id];
    });
    //@ts-ignore
    context.cart.set(cart);
    setSelected([]);
  };

  const visibleRows = useMemo(
    () =>
      //@ts-ignore
      [...Object.values(context.cart.value)]
        //@ts-ignore
        .sort(cartItemsComparator(colOrder, order))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    //@ts-ignore
    [order, colOrder, page, rowsPerPage, context.cart.value]
  );

  //------------------------------
  const makeCell = (col: string, row: Object) => {
    //@ts-ignore
    const val = row?.[col] || "";
    const props = {};
    let content = null;

    switch (col) {
      case "img":
        content = (
          <img
            //@ts-ignore
            src={val || row?.imgs?.[0]}
            className="min-w-20  max-w-32 rounded-lg"
          />
        );
        break;
      case "label":
        //@ts-ignore
        props.id = `enhanced-table-checkbox-`;
        //@ts-ignore
        props.padding = "none";
        break;
      case "categoria":
        //@ts-ignore
        props.className = "capitalize";
        break;
      case "marca":
      case "medidas":
        //@ts-ignore
        content = row?.info?.[col];
        break;
      case "price":
        //@ts-ignore
        content = toPriceFormat(row?.price);
        break;
      case "subtotal":
        //@ts-ignore
        const subtotal = row?.price * row?.qtt;
        content = toPriceFormat(subtotal);
        break;
      case "qtt":
        //@ts-ignore
        content = (
          <TextField
            type="number"
            //@ts-ignore
            name={`qtt-${row?.id}`}
            size="small"
            label="Cantidad"
            className="w-28"
            value={val}
            //@ts-ignore
            onChange={(e) => handleChangeQtt(e, row.id)}
          />
        );
        break;

      default:
        content = val;
        break;
    }

    return <TableCell {...props}>{content || val || "-"}</TableCell>;
  };

  //@ts-ignore
  const handleChangeQtt = (e, id) => {
    const qtt = Number(e.target.value);

    //@ts-ignore
    const cart_ = structuredClone(context.cart.value);
    cart_[id].qtt = qtt;

    //@ts-ignore
    if (cart_[id]?.prices) {
      let price = 0;
      //@ts-ignore
      for (const umin in cart_[id].prices) {
        if (qtt >= Number(umin)) {
          //@ts-ignore
          price = cart_[id].prices[umin];
        } else {
          break;
        }
      }
      //@ts-ignore
      cart_[id].price = price;
    }

    //@ts-ignore
    context.cart.set(cart_);
  };

  useEffect(() => {
    let total_ = 0;
    //@ts-ignore
    Object.values(context.cart.value).forEach(
      //@ts-ignore
      (row) => (total_ += row?.price * row?.qtt)
    );

    setTotal(total_);
    //@ts-ignore
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

        <TableContainer className="flex-grow">
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={colOrder}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              //@ts-ignore
              cols={cols}
            />

            <TableBody>
              {visibleRows.map((row) => {
                //@ts-ignore
                const isItemSelected = selected.includes(row.id);

                return (
                  <TableRow
                    //@ts-ignore
                    key={row.id}
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        //@ts-ignore
                        name={`check-${row.id}`}
                        color="primary"
                        checked={isItemSelected}
                        //@ts-ignore
                        onClick={() => handleClick(row.id)}
                      />
                    </TableCell>

                    {cols.map((col) => (
                      <Fragment key={col.id}>
                        {
                          //@ts-ignore
                          makeCell(col.id, row)
                        }
                      </Fragment>
                    ))}
                  </TableRow>
                );
              })}

              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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

          <ButtonContinueWp
            cart={
              //@ts-ignore
              context.cart.value
            }
          />
        </article>
      </section>
    </main>
  );
}
