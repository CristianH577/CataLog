import { useState } from "react";

const item_data_default = { id: 0, label: "", qtt: 1, price: 0 };

export function useCart() {
  const [cart, setCart] = useState({});

  const addToCart = (itemCartData = {}) => {
    const cart_ = structuredClone(cart);

    const item_ = { ...item_data_default, ...itemCartData };

    if (item_.qtt) {
      //@ts-ignore
      cart_[item_.id] = item_;
    } else {
      //@ts-ignore
      if (itemCartData.id in cart_) delete cart_[itemCartData.id];
    }

    setCart(cart_);
  };

  return { value: cart, set: setCart, add: addToCart };
}
