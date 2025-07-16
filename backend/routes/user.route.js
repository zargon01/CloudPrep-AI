const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
  updatePassword
} = require('../controllers/userController');

const protect = require('../middleware/auth.middleware');
const allowRoles = require('../middleware/roles.middleware');

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

module.exports = router;
