import { Button } from "@mui/material";
import { FaCartArrowDown, FaCartPlus, FaShoppingCart } from "react-icons/fa";

export default function ButtonCart({
  inCart = false,
  action = () => {},
  className = "",
  ...props
}) {
  return (
    <Button
      variant="contained"
      size="small"
      color={inCart ? "success" : "primary"}
      className={`group/button text-2xl${className ? " " + className : ""} ${
        inCart
          ? "hover:text-red-600 hover:bg-red-500/20"
          : "hover:text-blue-600 hover:bg-blue-500/20"
      }`}
      onClick={action}
      title={inCart ? "Quitar del carrito" : "Agregar al carrito"}
      {...props}
    >
      {inCart ? (
        <>
          <FaShoppingCart className="group-hover/button:hidden" />
          <FaCartArrowDown className="hidden group-hover/button:block" />
        </>
      ) : (
        <FaCartPlus />
      )}
    </Button>
  );
}
