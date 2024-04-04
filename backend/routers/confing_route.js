const indexR = require("./index");
const gradesR = require("./grades");
const usersR = require("./auth-users");
const productR = require("./products");
const adminR = require("./admins");

exports.routeInit = (app) => {
    app.use("/", indexR);

    app.use("/grades", gradesR);

    app.use("/users", usersR);

    app.use("/products", productR);

    app.use("/admin", adminR);
}