const express = require('express');

const feedController = require('../controllers/feed');
const router = express.Router();

// GET /feed/allctscans
router.get('/allctscans', feedController.getAllCtScans);

// GET /feed/getmyctscans/:id
router.get('/getmyctscans/:id', feedController.getmyctscans);

// POST /feed/postmyctscan
router.post('/postmyctscan', feedController.postmyctscan)

// POST /feed/postmycomment
router.post('/postmycomment/:postId', feedController.postmycomment)