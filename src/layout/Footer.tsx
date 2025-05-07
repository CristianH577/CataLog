import { Divider, Link } from "@mui/material";
import { LINKS_CONTACT } from "../consts/siteConfig";
import { FaExternalLinkAlt } from "react-icons/fa";
import { titleColor } from "../libs/tvs";
import { SVGLogo } from "../assets/svgs/SVGLogo";

export default function Footer() {
  // const links = [
  //   // { label: "Contacto", href: "#" },
  //   { label: "FAQs", href: "#" },
  //   { label: "Prductos", href: "#search" },
  // ];

  const info = [
    { label: "Direccion", value: "Calle, Provincia, Pais" },
    { label: "Celular", value: "+99 999 999 9999" },
    { label: "Telefono", value: "+99 999 999 9999" },
    { label: "Email", value: "catalog@negocio.com" },
  ];

  return (
    <footer className="bg-gradient-to-b from-primary to-primary-1 text-white p-4 pb-2 mt-8">
      <div className="max-w-[900px] space-y-4 place-self-center w-full">
        <span>
          <SVGLogo size={1.3} />
          <h1
            className={`${titleColor({
              color: "yellow",
              size: "xl",
            })}`}
          >
            Cata-Log
          </h1>
        </span>

        {/* <section className="space-x-4 text-2xl">
        {links.map((link) => (
          <Link key={link.label} href={link.href} className="text-white">
            {link.label}
          </Link>
        ))}
      </section> */}

        <section className="max-sm:space-y-4 sm:flex sm:flex-row-reverse sm:justify-end gap-8 sm:mt-4">
          <article>
            <h2 className="text-xl font-bold underline">Redes</h2>
            <ol>
              {LINKS_CONTACT.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-2 items-center text-white"
                    title={`Ir a ${item.label}`}
                  >
                    <item.icon /> {item.label} <FaExternalLinkAlt size={12} />
                  </Link>
                </li>
              ))}
            </ol>
          </article>

          <article>
            <h2 className="text-xl font-bold underline">Contacto</h2>
            <ol>
              {info.map((item) => (
                <li key={item.label}>
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value}
                </li>
              ))}
            </ol>
          </article>
        </section>

        <Divider variant="middle" className="bg-neutral-300" />

        <div className="flex gap-1 text-neutral-300 justify-center">
          <p>2025 - </p>

          <span>
            Diseñado por{" "}
            <Link
              href="https://github.com/CristianH577"
              target="_blank"
              rel="noopener noreferrer"
              title="Ir a perfil de Github"
              className="hover:boder-b border-neutral-400 text-inherit"
            >
              <span className="font-mono">©</span>
              VerdeAve
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
