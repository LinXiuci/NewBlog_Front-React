/***
 * 底部菜单项
 *  */
const tabs = [
  {
    key: 1,
    name: "导航",
    sub_tab: [
      { key: 11, name: "博客", path: "/app_content" },
      { key: 12, name: "相册", path: "/app_album" },
      { key: 13, name: "项目", path: "/app_project" },
      { key: 14, name: "统计", path: "/" },
      { key: 15, name: "时间轴", path: "/" },
    ],
  },
  {
    key: 2,
    name: "标签",
    sub_tab: [
      { key: 21, name: "技术杂谈", path: "/app_technology" },
      { key: 22, name: "生活日记", path: "/app_life" },
      { key: 23, name: "旅行日记", path: "/app_travel" },
    ],
  },

  {
    key: 3,
    name: "笔记",
    sub_tab: [
      { key: 31, name: "语雀", href: "https://www.yuque.com/dashboard" },
      { key: 32, name: "bing", path: "https://cn.bing.com/?mkt=zh-CN" },
    ],
  },
  {
    key: 4,
    name: "社区",
    sub_tab: [
      { key: 41, name: "知乎", href: "https://www.zhihu.com/" },
      { key: 42, name: "GitHub", href: "https://github.com/" },
    ],
  },
  {
    key: 5,
    name: "友链",
    sub_tab: [
      { key: 51, name: "loading", href: "友链1" },
      { key: 52, name: "loading", href: "友链2" },
      { key: 53, name: "loading", href: "友链3" },
      { key: 54, name: "loading", href: "友链4" },
      { key: 55, name: "更多友链", path: "/app_friend" },
    ],
  },
  {
    key: 6,
    name: "关于本站",
    sub_tab: [
      { key: 61, name: "关于主题", path: "友链1" },
      { key: 62, name: "版本声明", path: "友链2" },
    ],
  },
];

export default tabs;
