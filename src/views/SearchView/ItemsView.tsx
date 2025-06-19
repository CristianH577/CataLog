import { useOutletContext } from "react-router";
import { motion } from "framer-motion";

import { ItemData, TypeContext } from "../../consts/types";

import { toPriceFormat } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";

import { Button } from "@mui/material";

import ButtonCart from "../../components/ButtonCart";

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
    <motion.section
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className="max-w-[1500px] w-full grid xs:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(240px,_260px))] gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center"
    >
      {items.map((item: ItemData, i) => (
        <motion.article
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
            },
          }}
          className="relative rounded-lg hover:shadow-custom shadow-blue-400 flex flex-col items-center justify-between p-3"
        >
          <a
            href={"#itemview?id=" + item.id}
            title="Ver articulo"
            className="flex flex-col items-center justify-between cursor-pointer xs:max-w-64 h-full w-full"
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
          </a>

          <ButtonCart
            inCart={item.id in context.cart.value}
            action={() => handleButtonCart(item)}
          />
        </motion.article>
      ))}

      <article className="col-span-full">
        <Button
          variant="contained"
          className="h-16 place-self-center mt-4"
          style={{ display: items.length < totalItems ? "block" : "none" }}
          onClick={showMoreItems}
        >
          Mostrar mas
        </Button>
      </article>
    </motion.section>
  );
}
