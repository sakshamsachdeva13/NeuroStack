const create = require('./create')
const read = require('./read')

const createTPController = () => {

    let  tpc = {};

    tpc.create = (req , res) => create(req , res);
    tpc.read = (req , res) => read(req , res);

    return tpc;

}

module.exports = createTPController;