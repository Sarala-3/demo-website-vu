var express = require('express');

const app = express();
const port = 3000;
let LiveReloadExpress = require("livereload-express")(app);

app.use(LiveReloadExpress.static("public"));

LiveReloadExpress.listen(port, () => {
   console.log(`Example app listening on port http://localhost:${port}\nOpen @ http://localhost:${port}`);
});