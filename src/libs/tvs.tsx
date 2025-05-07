import { tv } from "tailwind-variants";

export const titleColor = tv({
  base: "tracking-tight font-semibold inline",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FFB457] to-[#FF705B]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      "": "",
      sm: "text-xl xs:text-2xl sm:text-3xl sm:pb-1",
      md: "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl",
      lg: "text-3xl xs:text-4xl sm:text-5xl lg:text-6xl",
      xl: "text-4xl xs:text-5xl sm:text-6xl lg:text-7xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "sm",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});
