"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

var _ImageControllersjs = require('../controllers/ImageControllers.js'); var _ImageControllersjs2 = _interopRequireDefault(_ImageControllersjs);


router.post('/', _ImageControllersjs2.default.create);
router.get('/', _ImageControllersjs2.default.index);
router.get('/:id', _ImageControllersjs2.default.show);

exports. default = router;
