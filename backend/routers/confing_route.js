const indexR = require("./index");
const gradesR = require("./grades");
const usersR = require("./users");

exports.routeInit = (app) => {
    app.use("/", indexR);

    app.use("/grades", gradesR);

    app.use("/users", usersR);
}