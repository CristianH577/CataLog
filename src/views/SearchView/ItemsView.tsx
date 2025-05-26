import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import { ItemData, TypeContext } from "../../consts/types";

import { toPriceFormat } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";

import { Button } from "@mui/material";

import ButtonCart from "../../components/ButtonCart";
import { FaCartPlus } from "react-icons/fa";

type TypeItemsViewProps = {
  items: ItemData[];
  totalItems?: number;
  showMoreItems?: () => void;
};

export default function ItemsView({
  items = [],
  totalItems = 0,
  showMoreItems = () => {},
}: TypeItemsViewProps) {
  const context: TypeContext = useOutletContext();

  const handleButtonCart = (itemData: ItemData) => {
    const inCart = itemData.id in context.cart.value;

    if (inCart) {
      itemData.qtt = 0;
    } else {
      itemData.qtt = 1;
    }

    context.cart.add(itemData);
  };

  return (
    <section
      // columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      // spacing={{ xs: 2, sm: 3, md: 0 }}
      // className="mx-sm:max-w-fit max-w-[1400px]"
      className="mx-sm:max-w-fit max-w-[1400px] grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3"
    >
      {items.map((item: ItemData, i) => (
        <article
          key={i}
          className="relative rounded-lg hover:shadow-custom shadow-blue-400/50 flex flex-col items-center justify-between p-3"
        >
          <motion.a
            href={"#itemview?id=" + item.id}
            className="flex flex-col items-center justify-between cursor-pointer xs:max-w-64 h-full w-full"
            whileTap={{ scale: 1.05 }}
          >
            <div className="xs:h-[200px] sm:h-[250px] w-full">
              <img
                src={item.img}
                className="drop-shadow-md rounded-lg h-full object-contain place-self-center"
              />
            </div>

            <div className="flex flex-col items-center p-4">
              <h3 className="text-sm capitalize text-neutral-400">
                {item.categoria}
              </h3>

              <h3
                className={`text-center ${titleColor({
                  color: "blue",
                })}`}
              >
                {item.label}
              </h3>

              <span className={`${titleColor({ color: "yellow" })}`}>
                {toPriceFormat(item.price)}
              </span>
            </div>
          </motion.a>

          <ButtonCart
            inCart={item.id in context.cart.value}
            action={() => handleButtonCart(item)}
          />
        </article>
      ))}

      <article className="col-span-full">
        <Button
          // ref={ref}
          variant="contained"
          className="h-16 place-self-center mt-4"
          style={{ display: items.length < totalItems ? "block" : "none" }}
          onClick={showMoreItems}
        >
          Mostrar mas
        </Button>
      </article>
    </section>
  );
}
