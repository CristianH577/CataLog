import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { useCart } from "../hooks/useCart";
import { scrollTop } from "../libs/functions";

import { CircularProgress } from "@mui/material";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const cart = useCart();

  useEffect(scrollTop, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-[monserrat]">
      <Navbar cartLength={Object.keys(cart.value).length} />

      <div className="flex-grow flex flex-col">
        <Suspense
          fallback={
            <span className="flex-grow w-full h-screen flex items-center justify-center">
              <CircularProgress />
            </span>
          }
        >
          <Outlet context={{ cart: cart }} />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
