import { motion } from "framer-motion";

// import Masonry from "@mui/lab/Masonry";

import { toPriceFormat } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";
import { useOutletContext } from "react-router";
import ButtonCart from "../../components/ButtonCart";
import { Button } from "@mui/material";
// import { useEffect, useRef } from "react";

export default function ItemsView({
  items = [],
  totalItems = 0,
  showMoreItems = () => {},
}) {
  const context = useOutletContext();
  // const ref = useRef(null);
  // const inView = useInView(ref);

  const handleButtonCart = (itemData = { id: 0, qtt: 0 }) => {
    //@ts-ignore
    const inCart = itemData.id in context.cart.value;

    if (inCart) {
      itemData.qtt = 0;
    } else {
      itemData.qtt = 1;
    }

    //@ts-ignore
    context?.cart?.add(itemData);
  };

  // useEffect(() => {
  //   inView && showMoreItems();
  // }, [inView]);

  return (
    <section
      // columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      // spacing={{ xs: 2, sm: 3, md: 0 }}
      // className="mx-sm:max-w-fit max-w-[1400px]"
      className="mx-sm:max-w-fit max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3"
    >
      {items.map((item, i) => (
        // <div key={i} className="flex items-center justify-center">
        <article
          key={i}
          className="relative rounded-lg hover:shadow-custom shadow-blue-400/50 flex items-center"
        >
          <ButtonCart
            className="absolute right-2 top-2 z-10"
            inCart={
              //@ts-ignore
              item.id in context.cart.value
            }
            action={() => handleButtonCart(item)}
          />

          <motion.a
            href={
              //@ts-ignore
              "#itemview?id=" + item.id
            }
            className="flex flex-col items-center cursor-pointer xs:max-w-64"
            whileTap={{ scale: 1.05 }}
          >
            <div className="p-1 sm:p-3">
              <img
                src={
                  //@ts-ignore
                  item.img
                }
                className="drop-shadow-md rounded-lg"
              />
            </div>

            <div className="flex flex-col items-center p-4">
              <h3 className="text-sm capitalize text-neutral-400">
                {
                  //@ts-ignore
                  item.categoria
                }
              </h3>

              <h3
                className={`italic ${titleColor({
                  color: "blue",
                  size: "sm",
                })}`}
              >
                {
                  //@ts-ignore
                  item.label
                }
              </h3>

              <span
                className={`${titleColor({ color: "yellow", size: "sm" })}`}
              >
                {
                  //@ts-ignore
                  toPriceFormat(item.price)
                }
              </span>
            </div>
          </motion.a>
        </article>
        // </div>
      ))}

      <Button
        // ref={ref}
        variant="contained"
        className="col-span-full opacity-"
        style={{ display: items.length < totalItems ? "block" : "none" }}
        onClick={showMoreItems}
      >
        Mostrar mas
      </Button>
    </section>
  );
}
