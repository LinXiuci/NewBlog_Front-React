/***
 * 导航栏
 *  */
const navigations = [
  {
    key: 1,
    title: "博客",
    secondary_menu: [
      { title: "内容", icon_name: "home-outline", path: "/app-content" },
      { title: "项目", icon_name: "logo-steam", path: "/app-project" },
      { title: "归档", icon_name: "albums-outline", path: "/app-filing" },
    ],
  },
  {
    key: 2,
    title: "影音",
    secondary_menu: [
      { title: "相册", icon_name: "image-outline", path: "/app-album" },
      { title: "足迹", icon_name: "location-outline", path: "/app-footmark" },
      { title: "哔哩", icon_name: "logo-twitch", href: "https://www.bilibili.com/" },
    ],
  },
  {
    key: 3,
    title: "作者",
    secondary_menu: [
      { title: "简介", icon_name: "ribbon-outline", path: "/app-introduction" },
      { title: "物品", icon_name: "layers-outline", path: "/app-wupin" },
      { title: "友链", icon_name: "person-add-outline", path: "/app-friend" },
    ],
  },
  {
    key: 4,
    title: "空间",
    secondary_menu: [
      {
        title: "速查",
        icon_name: "paper-plane-outline",
        href: "https://cn.bing.com/",
      },
      {
        title: "论坛",
        icon_name: "people-outline",
        href: "https://www.zhihu.com/",
      },
      {
        title: "服务",
        icon_name: "footsteps-outline",
        href: "https://www.code-nav.cn/",
      },
    ],
  },
];

export default navigations;
