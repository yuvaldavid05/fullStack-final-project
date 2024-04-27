const indexR = require("./index");
const gradesR = require("./grades");
// const usersR = require("./auth");
const authR = require("./auth");
const productR = require("./products");
const adminR = require("./admins");

exports.routeInit = (app) => {
    app.use("/", indexR);

    app.use("/grades", gradesR);

    // app.use("/users", usersR);

    app.use("/auth", authR);

    app.use("/products", productR);

    app.use("/admin", adminR);
}