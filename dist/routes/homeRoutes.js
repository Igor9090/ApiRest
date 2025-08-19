"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

var _HomeControllersjs = require('../controllers/HomeControllers.js'); var _HomeControllersjs2 = _interopRequireDefault(_HomeControllersjs);

router.get('/', _HomeControllersjs2.default.index)

exports. default = router
