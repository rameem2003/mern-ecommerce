const fs = require("fs");
const deleteFile = (fileLink) => {
  fs.unlink(fileLink, (err) => {
    if (err) {
      return err;
    }
  });
};

module.exports = deleteFile;
