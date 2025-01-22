const app = require("./app");

require("dotenv").config();

app.listen(process.env.PORT || 8000, () => {
  console.log({
    msg: "MERN E-Commerce Backend",
    developed_by: "ROL Studio Bangladesh",
    server_ip: `http://localhost:${process.env.PORT}`,
  });
});
