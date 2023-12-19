const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth.middlewares')
const {validateAppartementData } = require('../middlewares/appartement.middlewares')
// for Appartement  

const {
    createAppartement,
    getAllAppartements,
    getAppartementById,
    deleteAppartement,
    updateAppartement


}=require('../controllers/syndic.controller') 


router.post('/addAppartement',authMiddleware,validateAppartementData,createAppartement);
router.get('/appartements' , authMiddleware , getAllAppartements)
router.get('/getAppartement/:appartementId', getAppartementById);
router.put('/updateAppartement/:appartementId', updateAppartement);
router.delete('/removeAppartement/:appartementId', deleteAppartement);

// for Appartement  


// for paiment  

const {
    getAllPayments,
    addPaiement,

}= require('../controllers/payment.controller')

router.get('/AllPayments',authMiddleware ,  getAllPayments)
router.put('/AddPayment' , addPaiement)


// for paiment  


// for Tenant  

const {
    addTenant,
    getAllTenants,
    getTenantById,
    updateTenant,
    deleteTenant
} = require('../controllers/tenant.controller')


router.get('/getAllTenants', authMiddleware ,  getAllTenants)
router.post('/addTenant',authMiddleware ,  addTenant)
router.get('/getTenantById/:tenantId', getTenantById)
router.put('/updateTenant/:tenantId', updateTenant)
router.delete('/deleteTenant/:tenantId', deleteTenant)





// for Tenant  








// router.get('/reset-password', resetPassword);
// router.post('/changePassword',updatePassword)

module.exports=router