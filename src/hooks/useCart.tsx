import { useEffect, useState } from "react";
import { ItemData } from "../consts/types";

export function useCart() {
  const [cart, setCart] = useState<{ [key: number]: ItemData }>({});

  const addToCart = (itemData: ItemData) => {
    const cart_ = structuredClone(cart);

    if (itemData.qtt) {
      cart_[itemData.id] = itemData;
    } else {
      if (itemData.id in cart_) delete cart_[itemData.id];
    }

    setCart(cart_);
  };

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return { value: cart, set: setCart, add: addToCart };
}
