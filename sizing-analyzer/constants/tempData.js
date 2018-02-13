import qrCode from "react-icons/lib/fa/qrcode";
import icon from "~/assets/images/sizing-analyzer/icon.png";

export const navData = [
  {
    key: 1,
    icon: icon,
    type: "title",
    text: "Container",
    active: false,
    select: -1,
    isLink: true,
    url: "/result/container",
  }, {
    key: 2,
    icon: icon,
    type: "title",
    text: "Node",
    active: false,
    select: -1,
    isLink: true,
    url: "/result/node",
  }, {
    key: 3,
    icon: icon,
    type: "title",
    text: "Pool",
    active: false,
    select: -1,
    isLink: true,
    url: "/result/pool",
  },
];

export const entryButtons = [
  {
    key: 1,
    icon,
    type: "title",
    text: "Container",
    active: false,
    select: -1,
    isLink: true,
    url: "/",
  }, {
    key: 2,
    icon,
    type: "title",
    text: "Node",
    active: false,
    select: -1,
    isLink: true,
    url: "/",
  }, {
    key: 3,
    icon,
    type: "title",
    text: "Pool",
    active: false,
    select: -1,
    isLink: true,
    url: "/",
  },
];

export const entryList = [
  {
    key: 1,
    width: 228,
    link: "result/container",
    text: "Select my own tuples",
  }, {
    key: 2,
    width: 287,
    link: "result/ranking",
    text: "Top 5 most wasteful resources",
  }, {
    key: 3,
    width: 287,
    link: "result/ranking",
    text: "Top 5 top performing resources",
  },
];
