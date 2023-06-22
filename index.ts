import app from "./src/app";
import db from "./src/db";

db.conn.sync({ force: true }).then(() => {
  app.listen(app.get("port"), () => {
    console.log(`%s listening at ${app.get("port")}`);
  });
});
