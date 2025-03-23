import { send, shield, star  } from "../assets";

export const navLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
  },
  {
    id: "features",
    link: "/#features",
    title: "Features",
  },
  {
    id: "product",
    link: "/product",
    title: "Product",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Lorem",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Ipsum",
    content:
      "Donec et magna eu nibh interdum fermentum ut dolor. ",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Dolor",
    content:
      "Ut dolor turpis, interdum et ipsum ut, convallis luctus mi. ",
  },
];
