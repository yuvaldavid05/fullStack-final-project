const indexR = require("./index");
const gradesR = require("./grades");
const authR = require("./auth");
const productR = require("./products");
const adminR = require("./admins");
const userR = require("./users");

exports.routeInit = (app) => {
    app.use("/", indexR);

    app.use("/grades", gradesR);

    app.use("/users", userR);

    app.use("/auth", authR);

    app.use("/products", productR);

    app.use("/admin", adminR);

}