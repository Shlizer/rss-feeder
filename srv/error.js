const fs = require('fs');
const path = require("path");
const errorDefaultPath = './log';

const handleException = (error, type, dir, wndHandle) => {
  const date = new Date();
  const fileName = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + '.log';
  const filePath = path.join(__dirname, '../', dir ? dir : errorDefaultPath, fileName);

  const oldData = fs.existsSync(filePath) ? fs.readFileSync(filePath) + "\n" : '';

  if (wndHandle) {
    wndHandle.webContents.send('error', { type: type || 'server', message: error });
  }
  fs.writeFileSync(filePath, oldData + date.toLocaleString() + ": " + (typeof error === 'string' ? error : JSON.stringify({ error: error })))
}

module.exports = { errorDefaultPath, handleException };
