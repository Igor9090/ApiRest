"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

var _UserControllersjs = require('../controllers/UserControllers.js'); var _UserControllersjs2 = _interopRequireDefault(_UserControllersjs);
var _longinRequirdjs = require('../middlewares/longinRequird.js'); var _longinRequirdjs2 = _interopRequireDefault(_longinRequirdjs);


// Não deveria exister
router.get('/' , _UserControllersjs2.default.index)
router.get('/:id', _UserControllersjs2.default.show)


router.post('/', _UserControllersjs2.default.create)
router.put('/', _longinRequirdjs2.default , _UserControllersjs2.default.update)
router.delete('/', _longinRequirdjs2.default, _UserControllersjs2.default.delete)

exports. default = router
