const express = require('express');
const router = express.Router()
let random = require('../randomUser')

router.get('/all', (req, res) => {
    const { limit } = req.query;
    console.log(limit)
    res.send(random.slice(0, limit))
})
router.get('/random', (req, res) => {
    function randomUserName() {
        const randomUser = Math.floor(Math.random() * random.length)
        const userName = random[randomUser]
        return userName
    }
    const userName = randomUserName()
    res.send(userName)
})

router.post('/save', (req, res) => {
    const user = req.body
    random.push(user)
    res.send(random)
})


//bulk update
router.patch('/bulk-update', function (req, res, next) {
    async.each(req.body, function (obj, cb) {
        random.findById(obj.employeeId, function (err, employee) {
            if (err) {
                return cb(err);
            }
            employee = new random({ name: obj.name });
            employee.save(cb);
        });
    }, function (err) {

    });
});


router.route("/:id").patch((req, res) => {
    const { id } = req.params;
    const newDatas = random.find(data => data.id == id);
    newDatas.id = id;
    newDatas.name = req.body.name;
    newDatas.gender = req.body.gender;
    newDatas.address = req.body.address;
    newDatas.photoUrl = req.body.photoUrl;
    newDatas.contact = req.body.contact;
    res.send(newDatas)
}).delete((req, res) => {
    const { id } = req.params;
    random = random.filter(user => user.id !== Number(id))
    res.send(random)
})
module.exports = router;