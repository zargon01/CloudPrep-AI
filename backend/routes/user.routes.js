import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
  updatePassword
} from '../controllers/user.controller.js';

import protect from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/roles.middleware.js';

const router = express.Router();

// ========== Auth Routes ==========
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/me', protect, getCurrentUser);

// ========== Admin/User Management ==========
router.get('/', protect, allowRoles('admin'), getAllUsers);
router.get('/:id', protect, allowRoles('admin', 'user'), getUserById);
router.put('/:id', protect, allowRoles('admin', 'user'), updateUser);
router.delete('/:id', protect, allowRoles('admin', 'user'), deleteUser);
router.patch('/:id/role', protect, allowRoles('admin'), updateUserRole);
router.patch('/:id/password', protect, allowRoles('admin', 'user'), updatePassword);

export default router;
