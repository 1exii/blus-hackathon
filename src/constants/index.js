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
  {
    id: "quiz",
    link: "/quiz",
    title: "Quiz",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Versatile Usage",
    content:
      "Cerberus functions as both a website and a chrome extension.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "Protect yourself from malicious emails",
    content:
      "Our built-in phishing scanner will process the information and provide a detailed analysis of whether or not it is a scam.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Get access to the Blacklist",
    content:
      "View our exclusive database of malicious emails. Once our system registers a malicious email, it will save the sender's address and alert other users who provide the same address.",
  },
];
