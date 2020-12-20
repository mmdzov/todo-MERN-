const fs = require("fs");
const path = require("path");
const { cwd } = require("process");
const logDir = path.resolve(cwd() + "/logs");
const logFile = logDir.concat("/req.json");

module.exports = (req, res, next) => {
  fs.access(logDir, (err) => {
    if (err?.code === "ENOENT") {
      fs.mkdir(logDir, (err) => {
        if (err) throw err;
      });
    }
  });
  saveLog(req);
  next();
};

const saveLog = (req) => {
  fs.readFile(logFile, (err, data) => {
    if (err) {
      if (err?.code === "ENOENT") {
        data = "[]";
        try {
          fs.writeFileSync(logFile, data);
        } catch (e) {
          console.log(e);
        }
      } else {
        console.error(err);
        return;
      }
    } else {
      console.log(err);
    }
    data = JSON.parse(data);
    data.push({
      url: req.baseUrl,
      header: req.headers,
      body: req.body,
      date: Date.now(),
    });
    data = JSON.stringify(data);
    try {
      fs.writeFileSync(logFile, data);
    } catch (e) {
      console.log(e);
    }
  });
};
