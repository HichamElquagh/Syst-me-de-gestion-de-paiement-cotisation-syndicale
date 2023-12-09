const {
  register
} = require('../../backend/controllers/auth.controller');

const userModel = require('../../models/users');
const roleModel = require('../../models/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const generateAccessToken = require('../../services/jwtToken');
const verififemail = require('../../services/verifEmail');

jest.mock('../models/users');
jest.mock('../models/role.model');
jest.mock('bcrypt');
jest.mock('../services/jwtToken');
jest.mock('../services/verifEmail');

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

describe('Auth Controller Register Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 400 if email is already in use', async () => {
    const req = {
      body: {
        email: 'existing@example.com',
    
      }
    };

    userModel.findOne.mockResolvedValue({ email: 'existing@example.com' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Cet e-mail est déjà utilisé. Veuillez choisir un autre e-mail.'
    });
  });

  it('should return status 400 if the provided role is invalid', async () => {
    const req = {
      body: {
        email: 'new@example.com',
        role: 'invalidRole',
    
      }
    };

    roleModel.findOne.mockResolvedValue(null);

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Rôle invalide.'
    });
  });

  it('should return status 400 if trying to register as a manager', async () => {
    const req = {
      body: {
        email: 'manager@example.com',
        role: 'manager',
        
      }
    };

    roleModel.findOne.mockResolvedValue({ role_name: 'manager' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'vous avez pas le droit de vous inscrire en tant que manager'
    });
  });

  it('should successfully register and return status 201, user data, and token', async () => {
    const req = {
      body: {
        email: 'new@example.com',
        role: 'client',
        
      }
    };

    const role = { role_name: 'client', _id: 'validRoleId' };
    roleModel.findOne.mockResolvedValue(role);
    userModel.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    jwt.sign.mockReturnValue('mockAccessToken');

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'activer votre compte, veuillez vérifier votre e-mail.',
      user: expect.any(Object),
      token: 'mockAccessToken'
    });
  });
});
