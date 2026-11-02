import Builder from '../models/builder.model'

const buildersSerializer = data => ({
    id: data.id,
    name: data.name,
    deployed: data.deployed,
    content: data.content,
    flags: data.flags
});

// Retrieve all data
exports.findAll =  (req, res) => {
    Builder.find()
    .then(async data => {
        const builders = await Promise.all(data.map(buildersSerializer));
        res.send(builders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Builders."
        });
    });
};

// Retrieve data with pagination

exports.findPagination = async (req, res) => {
    const { page = 1, limit = 5, name = "", deployed = ""} = req.query

    let query = {}
    if (deployed && deployed !== "null") {
        query =  { deployed : new RegExp(`${deployed}+`, "i") }
        
        if (name && name !== "null") {
            query = {
                $or: [ { deployed : new RegExp(`${deployed}+`, "i") } , { name: new RegExp(`${name}+`, "i") } ]
            }
        }
    }
    else if (name && name !== "null") {
        query = { name: new RegExp(`${name}+`, "i") }
    }

    const paginated = await Builder.paginate(
        query,
        {
            page,
            limit,
            lean: true,
            sort: { updatedAt: "desc" }
        }
    )
    
    const { docs } = paginated;
    const builders = await Promise.all(docs.map(buildersSerializer));

    delete paginated["docs"];
    const meta = paginated

    res.json({ meta, builders });
};

exports.findOne = (req, res) => {
    Builder.findById(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    message: "Builder not found with id " + req.params.id
                });
            }
            const builder = buildersSerializer(data)
            res.send(builder);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Builder not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving builder with id " + req.params.id
            });
        });
};

exports.create = (req, res) => {
    if(!req.body.name) {
         return res.status(400).send({
             message: "Name can not be empty"
         });
    }

    const builder = new Builder({
        name: req.body.name.trim(),
        deployed: req.body.deployed.trim(),
        content: req.body.content.trim(),
        flags: req.body.flags
    });

    builder.save()
    .then(data => {
        const builder = buildersSerializer(data)
        res.send(builder);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the builder."
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    Builder.findByIdAndUpdate(req.params.id, {
        name: req.body.name.trim(),
        deployed: req.body.deployed.trim(),
        content: req.body.content.trim(),
        flags: req.body.flags
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Builder not found with id " + req.params.id
            });
        }
        const builder = buildersSerializer(data)
        res.send(builder);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Builder not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating builder with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
  Builder.findByIdAndRemove(req.params.id)
     .then(builder => {
         if(!builder) {
             return res.status(404).send({
                 message: "Builder not found with id " + req.params.id
             });
         }
         res.send({ id: req.params.id, message: "Builder deleted successfully!" });
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Builder not found with id " + req.params.id
             });
         }
         return res.status(500).send({
             message: "Could not delete builder with id " + req.params.id
         });
     });
};
