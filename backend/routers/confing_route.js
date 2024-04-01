const indexR = require("./index");
const gradesR = require("./grades");

exports.routeInit = (app) => {
    app.use("/", indexR);

    app.use("/grades", gradesR);
}