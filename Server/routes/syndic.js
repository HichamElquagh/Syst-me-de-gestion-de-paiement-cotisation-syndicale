const express = require('express');
const router = express.Router();



// for Appartement  

const {
    createAppartement,
    getAllAppartements,
    getAppartementById,
    deleteAppartement,
    updateAppartement


}=require('../controllers/syndic.controller') 


router.post('/addAppartement',createAppartement);
router.get('/appartements' , getAllAppartements)
router.get('/getAppartement/:appartementId', getAppartementById);
router.put('/updateAppartement/:appartementId', updateAppartement);
router.delete('/removeAppartement/:appartementId', deleteAppartement);

// for Appartement  


// for paiment  

const {
    getAllPayments

}= require('../controllers/payment.controller')

router.get('/addTenant', getAllPayments)

// for paiment  


// for Tenant  

const {
    addTenant,
    getAllTenants,
    getTenantById,
    updateTenant,
    deleteTenant
} = require('../controllers/tenant.controller')


router.get('/getAllTenants', getAllTenants)
router.post('/addTenant', addTenant)
router.get('/getTenantById/:tenantId', getTenantById)
router.put('/updateTenant/:tenantId', updateTenant)
router.delete('/deleteTenant/:tenantId', deleteTenant)





// for Tenant  








// router.get('/reset-password', resetPassword);
// router.post('/changePassword',updatePassword)

module.exports=router