const express = require("express");
const bankingApp = express();
const host =process.env.PORT|| 5000;
bankingApp.use(require("../source/routers/route"));
bankingApp.use(express.json());
require("../database/customer");
require("../database/emp");
var cors = require('cors')

bankingApp.use(cors())

bankingApp.listen(host,()=>{console.log(`Server up at ${host}`)});