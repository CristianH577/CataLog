import { Suspense, useEffect } from "react";
import Footer from "./Footer";
import { CircularProgress } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import { scrollTop } from "../libs/functions";
import { useCart } from "../hooks/useCart";

export default function Layout() {
  const { pathname } = useLocation();
  const cart = useCart();

  useEffect(scrollTop, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartLength={Object.keys(cart.value).length} />

      <div className="flex-grow flex flex-col">
        <Suspense
          fallback={
            <span className="w-full flex-grow flex items-center justify-center">
              <CircularProgress color="secondary" />
            </span>
          }
        >
          <Outlet context={{ cart: cart }} />
        </Suspense>

        <Footer />
      </div>
    </div>
  );
}
