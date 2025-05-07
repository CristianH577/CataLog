import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { MouseEvent } from "react";
import { EnhancedTableProps, ItemData } from "../../consts/types";

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    cols = [],
  } = props;
  const createSortHandler =
    (property: keyof ItemData) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const disabled_sort_cols = ["img", "subtotal"];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            name="check-all-rows"
            slotProps={{
              input: {
                "aria-label": "select all desserts",
              },
            }}
          />
        </TableCell>

        {cols.map((headCell) => {
          const id = headCell.id;
          if (disabled_sort_cols.includes(id)) {
            return (
              <TableCell key={id} className="font-semibold">
                {headCell.label}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                key={id}
                sortDirection={orderBy === id ? order : false}
                className="font-semibold"
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : "asc"}
                  onClick={createSortHandler(id)}
                >
                  {headCell.label}
                  {orderBy === id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}
