// const path = require("path")
// const fs = require("fs")
// const htmlFolder = path.join(__dirname, "../html/")
// const html = fs.readdirSync(htmlFolder).filter((c) => c !== "README.md")
const principleSidebar = require("./sidebars/principle")
const structureSidebar = require("./sidebars/structure")
const algorithmSidebar = require("./sidebars/algorithm")
const systemSidebar = require("./sidebars/system")
const networkSidebar = require("./sidebars/network")

module.exports = {
  title: "计算机基础",
  description: "前端计算机基础",
  themeConfig: {
    nav: [
      {
        text: "编译原理",
        items: [
          {
            text: "知识图谱",
            link: "/principle/",
          },
          // {
          //   text: "教程/书籍",
          //   items: [{ text: "javascript高级程序设计", link: "/html-course1/" }],
          // },
        ],
      },
      {
        text: "数据结构",
        items: [
          {
            text: "知识图谱",
            link: "/structure/",
          },
        ],
      },
      {
        text: "算法",
        items: [
          {
            text: "知识图谱",
            link: "/algorithm/",
          },
        ],
      },
      {
        text: "操作系统",
        items: [
          {
            text: "知识图谱",
            link: "/system/",
          },
        ],
      },
      {
        text: "计算机网络",
        items: [
          {
            text: "知识图谱",
            link: "/network/",
          },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      "/principle/": principleSidebar,
      "/structure/": structureSidebar,
      "/algorithm/": algorithmSidebar,
      "/system/": systemSidebar,
      "/network/": networkSidebar,
    },
  },
}
