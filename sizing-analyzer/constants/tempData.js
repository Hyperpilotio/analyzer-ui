import icon from "~/assets/images/sizing-analyzer/icon.png";
import iconContainer from "~/assets/images/sizing-analyzer/icon_container.svg";
import iconNode from "~/assets/images/sizing-analyzer/icon_node.svg";
import iconPool from "~/assets/images/sizing-analyzer/icon_pool.svg";

export const navData = [
  {
    key: 1,
    icon: iconContainer,
    type: "title",
    text: "Container",
    active: false,
    select: -1,
    isLink: true,
    url: "/result/container",
  }, {
    key: 2,
    icon: iconNode,
    type: "title",
    text: "Node",
    active: false,
    select: -1,
    isLink: true,
    url: "/result/node",
  }, {
    key: 3,
    icon: iconPool,
    type: "title",
    text: "Pool",
    active: false,
    select: -1,
    isLink: true,
    url: "/result/pool",
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


export const resultPageHeader = [
  "App label", "Image label", "Current Request", "Suggested Request",
  "Current Limit", "Suggested Limit",
];


export const limitData = {
  suggestedLimit: [
    { x: new Date(2000, 1, 1), y: 4 },
    { x: new Date(2000, 6, 1), y: 4 },
    { x: new Date(2000, 12, 1), y: 4 },
    { x: new Date(2001, 1, 1), y: 4 },
    { x: new Date(2002, 1, 1), y: 4 },
    { x: new Date(2003, 1, 1), y: 4 },
    { x: new Date(2004, 1, 1), y: 4 },
    { x: new Date(2005, 1, 1), y: 4 },
    { x: new Date(2006, 1, 1), y: 4 },
    { x: new Date(2007, 1, 1), y: 4 },
    { x: new Date(2008, 1, 1), y: 4 },
    { x: new Date(2009, 1, 1), y: 4 },
    { x: new Date(2010, 1, 1), y: 4 },
    { x: new Date(2013, 1, 1), y: 4 },
    { x: new Date(2014, 1, 1), y: 4 },
    { x: new Date(2015, 1, 1), y: 4 },
  ],
  suggestedRequest: [
    { x: new Date(2000, 1, 1), y: 12 },
    { x: new Date(2000, 6, 1), y: 10 },
    { x: new Date(2000, 12, 1), y: 11 },
    { x: new Date(2001, 1, 1), y: 5 },
    { x: new Date(2002, 1, 1), y: 4 },
    { x: new Date(2003, 1, 1), y: 6 },
    { x: new Date(2004, 1, 1), y: 5 },
    { x: new Date(2005, 1, 1), y: 7 },
    { x: new Date(2006, 1, 1), y: 8 },
    { x: new Date(2007, 1, 1), y: 9 },
    { x: new Date(2008, 1, 1), y: 8.5 },
    { x: new Date(2009, 1, 1), y: 9 },
    { x: new Date(2010, 1, 1), y: 5 },
    { x: new Date(2013, 1, 1), y: 6 },
    { x: new Date(2014, 1, 1), y: 8 },
    { x: new Date(2015, 1, 1), y: 2 },
  ],
  currentLimit: [
    { x: new Date(2000, 1, 1), y: 14 },
    { x: new Date(2000, 6, 1), y: 20 },
    { x: new Date(2000, 12, 1), y: 16 },
    { x: new Date(2001, 1, 1), y: 16 },
    { x: new Date(2002, 1, 1), y: 20 },
    { x: new Date(2003, 1, 1), y: 10 },
    { x: new Date(2004, 1, 1), y: 15 },
    { x: new Date(2005, 1, 1), y: 15 },
    { x: new Date(2006, 1, 1), y: 18 },
    { x: new Date(2007, 1, 1), y: 19 },
    { x: new Date(2008, 1, 1), y: 18 },
    { x: new Date(2009, 1, 1), y: 25 },
    { x: new Date(2010, 1, 1), y: 20 },
    { x: new Date(2013, 1, 1), y: 26 },
    { x: new Date(2014, 1, 1), y: 28 },
    { x: new Date(2015, 1, 1), y: 25 },
  ],
  currentRequest: [
    { x: new Date(2000, 1, 1), y: 12 },
    { x: new Date(2000, 6, 1), y: 10 },
    { x: new Date(2000, 12, 1), y: 11 },
    { x: new Date(2001, 1, 1), y: 5 },
    { x: new Date(2002, 1, 1), y: 4 },
    { x: new Date(2003, 1, 1), y: 6 },
    { x: new Date(2004, 1, 1), y: 5 },
    { x: new Date(2005, 1, 1), y: 7 },
    { x: new Date(2006, 1, 1), y: 8 },
    { x: new Date(2007, 1, 1), y: 9 },
    { x: new Date(2008, 1, 1), y: 8.5 },
    { x: new Date(2009, 1, 1), y: 9 },
    { x: new Date(2010, 1, 1), y: 5 },
    { x: new Date(2013, 1, 1), y: 6 },
    { x: new Date(2014, 1, 1), y: 2 },
    { x: new Date(2015, 1, 1), y: 5 },
  ],

};

