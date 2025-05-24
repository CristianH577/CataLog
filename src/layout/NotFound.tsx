import { titleColor } from "../libs/tvs";

import { Button } from "@mui/material";

export default function NotFound() {
  return (
    <main className="items-center justify-center gap-8">
      <h1
        className={`uppercase ${titleColor({
          color: "blue",
          size: "lg",
        })}`}
      >
        Pagina no encontrada
      </h1>

      <Button
        href="#"
        color="warning"
        variant="contained"
        size="large"
        className="font-semibold"
      >
        Ir al inicio
      </Button>
    </main>
  );
}
