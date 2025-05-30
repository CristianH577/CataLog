import { alpha } from "@mui/material/styles";

import { titleColor } from "../../libs/tvs";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";

export default function EnhancedTableToolbar({
  numSelected = 0,
  handleDeleteRows = () => {},
}) {
  return (
    <Toolbar
      className="sm:ps-4"
      sx={[
        {
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <span className="flex-grow flex-shrink basis-full text-inherit font-semibold text-lg">
          {numSelected} Seleccionadas
        </span>
      ) : (
        <span
          id="tableTitle"
          className={`${titleColor({
            color: "blue",
            size: "lg",
          })} flex-grow flex-shrink basis-full`}
        >
          Carrito
        </span>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Eliminar" color="error">
          <IconButton onClick={handleDeleteRows}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : // <Tooltip title="Filtrar columnas">
      //   <IconButton>
      //     <FilterListIcon />
      //   </IconButton>
      // </Tooltip>
      null}
    </Toolbar>
  );
}
