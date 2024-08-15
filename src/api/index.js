const router = require("express").Router();
const auth = require("../middlewares/authMiddleware")

const authController=require("../controllers/auth.controller")
router.post('/signup', authController.signup)
router.post('/login', authController.login)


const destController = require("../controllers/destination.controller");
router.route("/destinations").get(destController.index)
    .post(destController.store)
    // .post(auth(['admin']), destController.store)

router.route('/destinations/:id').get(destController.show)
    .patch(auth(['admin']), destController.update)
    .delete(auth(['admin']), destController.delete)


module.exports = router;