import { Router } from 'express';
import { createField } from './field.controller.js';
import { getFields } from './field.controller.js';

const router = Router();

router.post(
    '/create', 
    createField
)

router.get(
    '/get',
    getFields
)

export default router;