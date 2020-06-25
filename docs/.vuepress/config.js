// const path = require("path")
// const fs = require("fs")
// const htmlFolder = path.join(__dirname, "../html/")
// const html = fs.readdirSync(htmlFolder).filter((c) => c !== "README.md")
const designSidebar = require("./sidebars/design")
const architectureSidebar = require("./sidebars/architecture")

module.exports = {
  title: "编程思想",
  description: "前端编程思想",
  themeConfig: {
    nav: [
      {
        text: "设计模式",
        items: [
          {
            text: "知识图谱",
            link: "/design/",
          },
          // {
          //   text: "教程/书籍",
          //   items: [{ text: "javascript高级程序设计", link: "/html-course1/" }],
          // },
        ],
      },
      {
        text: "架构模式",
        items: [
          {
            text: "知识图谱",
            link: "/architecture/",
          },
        ],
      },
      {
        text: "架构模式",
        items: [
          {
            text: "知识图谱",
            link: "/architecture/",
          },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      "/design/": designSidebar,
      "/architecture/": architectureSidebar,
    },
  },
}
