const router = require("express").Router();
const auth = require("./middlewares/authMiddleware")

const authController = require("./controllers/auth.controller")
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/auth/forgot-password', authController.forgotPassword)
router.post('/auth/verify-reset-password-token', authController.verifyResetPasswordToken)
router.post('/auth/reset-password', authController.resetPassword)

const destController = require("./controllers/destination.controller");
router.get("/destinations", destController.index)

// router.route('/destinations/:id').get(destController.show)
//     .patch(auth(['admin']), destController.update)
//     .delete(auth(['admin']), destController.delete)

const tourController = require("./controllers/tour.controller")
router.get('/tours', tourController.index)
router.get('/tours-for-destination/:slug', tourController.toursForDestination)
router.get('/tours/:slug', tourController.show)

const bookingController = require("./controllers/booking.controller");
router.route('/bookings').post(auth(), bookingController.create)

const wishListController = require("./controllers/wishlist.controller");
router.route('/wishlist').get(auth(), wishListController.getItems).post(auth(), wishListController.addItem)
router.post('/wishlist/remove',auth(), wishListController.removeItem)
router.route('/wishlist/details').get(auth(), wishListController.wishlistDetails)


// CUSTOMER ROUTES
const customerController = require("./controllers/customer.controller")
router.get('/customer/my-bookings', auth(), customerController.myBookings);


module.exports = router;
