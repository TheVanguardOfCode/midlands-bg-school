const fs = require("fs");
const path = require("path");

const addJsExtension = (filePath) => {
  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    files.forEach((file) => addJsExtension(path.join(filePath, file)));
  } else if (
    stat.isFile() &&
    (filePath.endsWith(".js") || filePath.endsWith(".mjs"))
  ) {
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(
      /(from\s+['"])(\..*?)(?=['"])/g,
      (match, p1, p2) => {
        if (p2.endsWith(".js") || p2.endsWith(".mjs")) {
          return p1 + p2;
        }
        return p1 + p2 + ".js";
      },
    );
    fs.writeFileSync(filePath, content, "utf8");
  }
};

addJsExtension(path.join(__dirname, "src"));
