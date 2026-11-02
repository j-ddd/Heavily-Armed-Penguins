import Machine from '../models/machine.model'

const machinesSerializer = data => ({
    id: data.id,
    name: data.name,
    ip: data.ip,
    username: data.username,
    os: data.os,
    credits: data.credits
});

// Retrieve all data
exports.findAll =  (req, res) => {
    Machine.find()
    .then(async data => {
        const machines = await Promise.all(data.map(machinesSerializer));
        res.send(machines);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving machines."
        });
    });
};

// Retrieve data with pagination

exports.findPagination = async (req, res) => {
    const { page = 1, limit = 5, name = "", ip = ""} = req.query

    let query = {}
    if (ip && ip !== "null") {
        query =  { ip : new RegExp(`${ip}+`, "i") }
        
        if (name && name !== "null") {
            query = {
                $or: [ { ip : new RegExp(`${ip}+`, "i") } , { name: new RegExp(`${name}+`, "i") } ]
            }
        }
    }
    else if (name && name !== "null") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await Machine.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const machines = await Promise.all(docs.map(machinesSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, machines });
};

exports.findOne = (req, res) => {
    Machine.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.id
                });
            }
            const machine = machinesSerializer(data)
            res.send(machine);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving machine with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {
    if(!req.body.name || !req.body.username || !req.body.ip) {
         return res.status(400).send({
             message: "Name, Username, and IP can not be empty"
         });
    }

    const machine = new Machine({
        name: req.body.name.trim(),
        username: req.body.username.trim(),
        ip: req.body.ip.trim()
    });

    machine.save()
    .then(data => {
        const machine = machinesSerializer(data)
        res.send(machine);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Machine."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name || !req.body.ip || !req.body.username) {
        return res.status(400).send({
            message: "Name, Username, and IP can not be empty"
        });
    }

    Machine.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        username: req.body.username.trim(),
        ip: req.body.ip.trim()
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Machine not found with id " + req.params.id
            });
        }
        const machine = machinesSerializer(data)
        res.send(machine);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Machine not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating machine with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Machine.findByIdAndRemove(req.params.id)
     .then(machine => {
         if(!machine) {
             return res.status(404).send({
                 message: "Machine not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Machine deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Machine not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete machine with id " + req.params.id
         });
     });
};
