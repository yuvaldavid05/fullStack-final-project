const indexR = require("./index");
const gradesR = require("./grades");
const usersR = require("./auth-users");

exports.routeInit = (app) => {
    app.use("/", indexR);

    app.use("/grades", gradesR);

    app.use("/users", usersR);
}