"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

var _ImageControllersjs = require('../controllers/ImageControllers.js'); var _ImageControllersjs2 = _interopRequireDefault(_ImageControllersjs);
var _longinRequird = require('../middlewares/longinRequird'); var _longinRequird2 = _interopRequireDefault(_longinRequird);

router.post('/', _longinRequird2.default, _ImageControllersjs2.default.create)

exports. default = router
