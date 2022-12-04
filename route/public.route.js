const express = require('express');
const router = express.Router();
const control = require('../controller/public.controller')

router.get('/register', control.register)

module.exports=router