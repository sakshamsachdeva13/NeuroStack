const create = require("./create");
const read = require("./read");
const update = require("./update");
const Model = require("../../../models/TreatmentPlan");

const createTPController = () => {
  let tpc = {};

  tpc.create = (req, res) => create(Model, req, res);
  tpc.read = (req, res) => read(Model, req, res);
  tpc.update = (req, res) => update(Model, req, res);

  return tpc;
};

module.exports = createTPController;
