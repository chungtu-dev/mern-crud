import express from 'express';
import { createUser, getUser, getUserById, updateUser, deleteUser } from '../controller/UserController.js'

const router = express.Router();

router.post('/', createUser)

router.get('/', getUser)

router.get('/:id', getUserById)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router