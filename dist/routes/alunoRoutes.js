"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
const router = new (0, _express.Router)();

var _AlunoControllers = require('../controllers/AlunoControllers'); var _AlunoControllers2 = _interopRequireDefault(_AlunoControllers);
var _longinRequird = require('../middlewares/longinRequird'); var _longinRequird2 = _interopRequireDefault(_longinRequird);

router.get('/', _AlunoControllers2.default.index)
router.get('/:id', _AlunoControllers2.default.show)
router.post('/', _longinRequird2.default, _AlunoControllers2.default.create)
router.put('/:id', _longinRequird2.default, _AlunoControllers2.default.update)
router.delete('/:id', _longinRequird2.default, _AlunoControllers2.default.delete)

exports. default = router
