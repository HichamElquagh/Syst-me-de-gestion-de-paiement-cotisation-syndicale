const { login } = require('../../backend/controllers/auth.controller');
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const generateAccessToken = require('../services/jwtToken');

jest.mock('../models/users');
jest.mock('../services/jwtToken'); // Mock the jwtToken service

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('Auth Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 400 if user with provided email is not found', async () => {
    const req = {
      body: {
        email: 'nonexistent@example.com',
        password: 'hicham12344',
      },
    };

    userModel.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'email invalid',
    });
  });

  it('should return status 400 if provided password is incorrect', async () => {
    const req = {
      body: {
        email: 'existing@example.com',
        password: 'wrongpassword',
      },
    };

    const existingUser = {
      email: 'existing@example.com',
      password: await bcrypt.hash('correctpassword', 10), 
    };

    userModel.findOne.mockResolvedValue(existingUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'password is incorrecte',
    });
  });

  it('should return user data and access token if login is successful', async () => {
    const req = {
      body: {
        email: 'existing@example.com',
        password: 'correctpassword', 
      },
    };

    const existingUser = {
      email: 'existing@example.com',
      password: await bcrypt.hash('correctpassword', 10), 
      // Other user data properties...
    };

    userModel.findOne.mockResolvedValue(existingUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); 

    const accessToken = 'mockAccessToken'; 

    generateAccessToken.mockReturnValue(accessToken);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: ' vous aver crée un compte avec success',
      data: existingUser,
      token: accessToken,
    });
  });
});
