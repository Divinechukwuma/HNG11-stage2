const express = require('express');
const router = express.Router();

const{
    getOrganistions,
    getOrganistion,
    createOrganisation,
    addUserToOrginastion,
} = require('../controllers/org_controller');

router.get('/',getOrganistions);
router.get('/:orgid',getOrganistion);
router.post('/', createOrganisation);
router.post('/:orgid/users',addUserToOrginastion);

module.exports = router;
