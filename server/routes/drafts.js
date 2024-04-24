import express from 'express';
import * as controller from '../controllers/draftControllers.js';


const router = express.Router()

router.get('/', controller.getDrafts) 
router.get('/:id', controller.getDraft) 
router.post('/', controller.createDraft)
router.patch('/:id', controller.updateDraft)
router.delete('/:id', controller.deleteDraft)


export default router
