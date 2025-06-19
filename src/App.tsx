import { lazy } from "react";

import { NAV_ITEMS } from "./consts/siteConfig";

import { Route, Routes } from "react-router";

import Layout from "./layout/Layout";
import NotFound from "./layout/NotFound";

import { TypeRoute } from "./consts/types";

const SearchView = lazy(() => import("./views/SearchView"));
const ItemView = lazy(() => import("./views/ItemView"));
const CartView = lazy(() => import("./views/CartView"));

function App() {
  const routesComponent = {
    default: null,
    itemView: <ItemView />,
    searchView: <SearchView />,
    cartView: <CartView />,
  };

  const routes = [
    ...NAV_ITEMS,
    {
      id: "itemView",
      href: "itemview",
      label: "Vista de item",
      icon: null,
    },
  ];

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<SearchView />} />

        {routes.map((route: TypeRoute) => {
          if (route.id in routesComponent) {
            return (
              <Route
                key={route.id}
                path={`${route.href}`}
                element={
                  routesComponent[route.id as keyof typeof routesComponent]
                }
              />
            );
          }

          return null;
        })}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
