const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// 指定 db.json 的正確路徑： public/db.json
const router = jsonServer.router(path.join(__dirname, "public", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

/**
 * 自訂一個路由 /all 用來回傳整個 db.json 的內容
 * （在開發階段可以方便一次取得所有資料）
 */
server.get("/all", (req, res) => {
  res.jsonp(router.db.getState());
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
