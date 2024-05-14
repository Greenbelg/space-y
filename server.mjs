import * as path from "path";
import fs from "fs";
import express from "express";

const rootDir = process.cwd();
const port = 3000;
const app = express();

app.use(express.static('spa/build'));

app.get("/client.mjs", (_, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.sendFile(path.join(rootDir, "client.mjs"), {
    maxAge: -1,
    cacheControl: false,
  });
});

// Обработчик для неизвестных адресов
app.get("*", (_, res) => {
  res.sendFile(path.resolve(rootDir, "spa/build", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
