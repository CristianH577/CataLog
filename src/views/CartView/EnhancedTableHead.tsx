import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { ItemData, TypeColumnTable, TypeOrder } from "../../consts/types";
import { ChangeEvent } from "react";

type TypeEnhancedTableProps = {
  numSelected: number;
  onRequestSort: (property: keyof ItemData) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: TypeOrder;
  orderCol: string;
  rowCount: number;
  cols: TypeColumnTable[];
};

export default function EnhancedTableHead({
  onSelectAllClick,
  onRequestSort,
  order = "asc",
  orderCol = "",
  numSelected = 0,
  rowCount = 0,
  cols = [],
}: TypeEnhancedTableProps) {
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

        {cols.map((col) => {
          const id = col?.id;
          if (disabled_sort_cols.includes(id)) {
            return (
              <TableCell key={id} className="font-semibold">
                {col?.label}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                key={id}
                sortDirection={orderCol === id ? order : false}
                className="font-semibold"
              >
                <TableSortLabel
                  active={orderCol === id}
                  direction={orderCol === id ? order : "asc"}
                  onClick={() => onRequestSort(id as keyof ItemData)}
                >
                  {col?.label}
                  {orderCol === id ? (
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
