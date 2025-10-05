import { toPriceFormat } from "../../libs/functions";

import { LINKS_CONTACT } from "../../consts/siteConfig";
import { ItemData } from "../../consts/types";

import { Button } from "@mui/material";

import { FaWhatsapp } from "react-icons/fa";

type TypeIButtonContinueWpProps = {
  cart: { [key: number]: ItemData };
};

export default function ButtonContinueWp({
  cart = {},
}: TypeIButtonContinueWpProps) {
  const handleSend = () => {
    const link_wp = LINKS_CONTACT.find((link) => (link.id = "wp"))?.href || "";

    const items_msg = ["Hola. Me interesa hacer este pedido:"];
    items_msg.push("");

    let total = 0;
    Object.values(cart).forEach((item) => {
      let array = [];
      const price = item?.price || 0;
      const subtotal = Number(item?.price) * Number(item?.qtt);

      total += subtotal;
      const price_number = toPriceFormat(price);
      const subtotal_number = toPriceFormat(subtotal);

      array.push(item?.label + " =>");
      array.push(price_number);
      array.push(`x${item?.qtt}u`);
      array.push(`= ${subtotal_number}`);
      const array_string = array.join(" ");

      items_msg.push(array_string);
    });
    items_msg.push("");

    const total_str = toPriceFormat(total);

    items_msg.push(`Total ${total_str}`);

    const msg = items_msg.join("\n");
    const encoded_message = encodeURIComponent(msg);
    const url = `${link_wp}&text=${encoded_message}`;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.focus();
    // console.log(decodeURIComponent(encoded_message));
  };

  return (
    <Button
      color="success"
      size="large"
      variant="contained"
      endIcon={<FaWhatsapp />}
      title="Continuar por WhatsApp"
      disabled={Object.keys(cart).length < 1}
      onClick={handleSend}
    >
      Continuar por
    </Button>
  );
}
