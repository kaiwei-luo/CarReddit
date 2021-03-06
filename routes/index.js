var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function(req, res) {
	res.render("landing");
});

// ============
// Auth Routes
// ============
// show register form
router.get("/register", function(req, res) {
	res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to r/Cars, " + user.username);
			res.redirect("/cars");
		});
	});
});

// show login form
router.get("/login", function(req, res) {
	res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/cars",
		failureRedirect: "/login"
	}), function(req, res) {
});

// Logout route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Log You Out");
	res.redirect("/cars");
});

module.exports = router;