const fs = require("fs").promises;
const path = require("path");

async function removeImage(productId) {
  const directory = path.join(__dirname, "../../public/uploads");

  const files = await fs.readdir(directory);
  files.map(async (item) => {
    item.startsWith(productId)
      ? await fs.unlink(`public/uploads/${item}`).catch(() => {})
      : "";
  });
}

module.exports = removeImage;
