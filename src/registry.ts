import { config } from "./config.js";
import { Hono } from "hono";
import getRSS from "./utils/getRSS.js";

// ============================================================
// 静态路由表（Vercel serverless 兼容补丁版）
// 原版通过 fs 扫描目录 + 动态 import 注册路由，serverless 环境中
// 路由文件不存在会导致 ERR_MODULE_NOT_FOUND，故改为静态导入。
// 新增/删除路由时需手动同步此文件。
// ============================================================

import { handleRoute as r_36kr } from "./routes/36kr.js";
import { handleRoute as r_51cto } from "./routes/51cto.js";
import { handleRoute as r_52pojie } from "./routes/52pojie.js";
import { handleRoute as r_acfun } from "./routes/acfun.js";
import { handleRoute as r_baidu } from "./routes/baidu.js";
import { handleRoute as r_bilibili } from "./routes/bilibili.js";
import { handleRoute as r_coolapk } from "./routes/coolapk.js";
import { handleRoute as r_csdn } from "./routes/csdn.js";
import { handleRoute as r_dgtle } from "./routes/dgtle.js";
import { handleRoute as r_doubanGroup } from "./routes/douban-group.js";
import { handleRoute as r_doubanMovie } from "./routes/douban-movie.js";
import { handleRoute as r_douyin } from "./routes/douyin.js";
import { handleRoute as r_earthquake } from "./routes/earthquake.js";
import { handleRoute as r_gameres } from "./routes/gameres.js";
import { handleRoute as r_geekpark } from "./routes/geekpark.js";
import { handleRoute as r_genshin } from "./routes/genshin.js";
import { handleRoute as r_github } from "./routes/github.js";
import { handleRoute as r_guokr } from "./routes/guokr.js";
import { handleRoute as r_hackernews } from "./routes/hackernews.js";
import { handleRoute as r_hellogithub } from "./routes/hellogithub.js";
import { handleRoute as r_history } from "./routes/history.js";
import { handleRoute as r_honkai } from "./routes/honkai.js";
import { handleRoute as r_hostloc } from "./routes/hostloc.js";
import { handleRoute as r_hupu } from "./routes/hupu.js";
import { handleRoute as r_huxiu } from "./routes/huxiu.js";
import { handleRoute as r_ifanr } from "./routes/ifanr.js";
import { handleRoute as r_ithomeXijiayi } from "./routes/ithome-xijiayi.js";
import { handleRoute as r_ithome } from "./routes/ithome.js";
import { handleRoute as r_jianshu } from "./routes/jianshu.js";
import { handleRoute as r_juejin } from "./routes/juejin.js";
import { handleRoute as r_kuaishou } from "./routes/kuaishou.js";
import { handleRoute as r_linuxdo } from "./routes/linuxdo.js";
import { handleRoute as r_lol } from "./routes/lol.js";
import { handleRoute as r_miyoushe } from "./routes/miyoushe.js";
import { handleRoute as r_neteaseNews } from "./routes/netease-news.js";
import { handleRoute as r_newsmth } from "./routes/newsmth.js";
import { handleRoute as r_ngabbs } from "./routes/ngabbs.js";
import { handleRoute as r_nodeseek } from "./routes/nodeseek.js";
import { handleRoute as r_nytimes } from "./routes/nytimes.js";
import { handleRoute as r_producthunt } from "./routes/producthunt.js";
import { handleRoute as r_qqNews } from "./routes/qq-news.js";
import { handleRoute as r_sinaNews } from "./routes/sina-news.js";
import { handleRoute as r_sina } from "./routes/sina.js";
import { handleRoute as r_smzdm } from "./routes/smzdm.js";
import { handleRoute as r_sspai } from "./routes/sspai.js";
import { handleRoute as r_starrail } from "./routes/starrail.js";
import { handleRoute as r_thepaper } from "./routes/thepaper.js";
import { handleRoute as r_tieba } from "./routes/tieba.js";
import { handleRoute as r_toutiao } from "./routes/toutiao.js";
import { handleRoute as r_v2ex } from "./routes/v2ex.js";
import { handleRoute as r_weatheralarm } from "./routes/weatheralarm.js";
import { handleRoute as r_weibo } from "./routes/weibo.js";
import { handleRoute as r_weread } from "./routes/weread.js";
import { handleRoute as r_yystv } from "./routes/yystv.js";
import { handleRoute as r_zhihuDaily } from "./routes/zhihu-daily.js";
import { handleRoute as r_zhihu } from "./routes/zhihu.js";

const routeMap: Record<string, any> = {
  "36kr": r_36kr,
  "51cto": r_51cto,
  "52pojie": r_52pojie,
  acfun: r_acfun,
  baidu: r_baidu,
  bilibili: r_bilibili,
  coolapk: r_coolapk,
  csdn: r_csdn,
  dgtle: r_dgtle,
  "douban-group": r_doubanGroup,
  "douban-movie": r_doubanMovie,
  douyin: r_douyin,
  earthquake: r_earthquake,
  gameres: r_gameres,
  geekpark: r_geekpark,
  genshin: r_genshin,
  github: r_github,
  guokr: r_guokr,
  hackernews: r_hackernews,
  hellogithub: r_hellogithub,
  history: r_history,
  honkai: r_honkai,
  hostloc: r_hostloc,
  hupu: r_hupu,
  huxiu: r_huxiu,
  ifanr: r_ifanr,
  "ithome-xijiayi": r_ithomeXijiayi,
  ithome: r_ithome,
  jianshu: r_jianshu,
  juejin: r_juejin,
  kuaishou: r_kuaishou,
  linuxdo: r_linuxdo,
  lol: r_lol,
  miyoushe: r_miyoushe,
  "netease-news": r_neteaseNews,
  newsmth: r_newsmth,
  ngabbs: r_ngabbs,
  nodeseek: r_nodeseek,
  nytimes: r_nytimes,
  producthunt: r_producthunt,
  "qq-news": r_qqNews,
  "sina-news": r_sinaNews,
  sina: r_sina,
  smzdm: r_smzdm,
  sspai: r_sspai,
  starrail: r_starrail,
  thepaper: r_thepaper,
  tieba: r_tieba,
  toutiao: r_toutiao,
  v2ex: r_v2ex,
  weatheralarm: r_weatheralarm,
  weibo: r_weibo,
  weread: r_weread,
  yystv: r_yystv,
  "zhihu-daily": r_zhihuDaily,
  zhihu: r_zhihu,
};

// 排除路由（如需下线某接口，把名字加进来即可）
const excludeRoutes: Array<string> = [];

const app = new Hono();

// 注册全部路由
for (const [router, handleRoute] of Object.entries(routeMap)) {
  if (excludeRoutes.includes(router)) continue;
  const listApp = app.basePath(`/${router}`);
  // 返回榜单
  listApp.get("/", async (c) => {
    // 是否采用缓存
    const noCache = c.req.query("cache") === "false";
    // 限制显示条目
    const limit = c.req.query("limit");
    // 是否输出 RSS
    const rssEnabled = c.req.query("rss") === "true";
    const listData = await handleRoute(c, noCache);
    // 是否限制条目
    if (limit && listData?.data?.length > parseInt(limit)) {
      listData.total = parseInt(limit);
      listData.data = listData.data.slice(0, parseInt(limit));
    }
    // 是否输出 RSS
    if (rssEnabled || config.RSS_MODE) {
      const rss = getRSS(listData);
      if (typeof rss === "string") {
        c.header("Content-Type", "application/xml; charset=utf-8");
        return c.body(rss);
      } else {
        return c.json({ code: 500, message: "RSS generation failed" }, 500);
      }
    }
    return c.json({ code: 200, ...listData });
  });
  // 请求方式错误
  listApp.all("*", (c) => c.json({ code: 405, message: "Method Not Allowed" }, 405));
}

// 获取全部路由
app.get("/all", (c) =>
  c.json(
    {
      code: 200,
      count: Object.keys(routeMap).length,
      routes: Object.keys(routeMap).map((path) => {
        if (excludeRoutes.includes(path)) {
          return { name: path, path: undefined, message: "This interface is temporarily offline" };
        }
        return { name: path, path: `/${path}` };
      }),
    },
    200,
  ),
);

export default app;
