const register = require("../controllers/auth.controller").register;
const userModel = require("../models/users");
const jwtToken = require("../services/jwtToken");
const mailer = require("../services/verifEmail");
const bcrypt = require("bcryptjs");


jest.mock("../models/users");
jest.mock("../services/jwtToken");
jest.mock("../services/verifEmail");
jest.mock("bcryptjs");

describe("test parti register", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if email is already used", async () => {
    const req = {
      body: {
        email: "existingemail@example.com",
        password: "password123",
        role: "user",
        // other properties as needed
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userModel.findOne = jest.fn().mockResolvedValue({});

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Cet e-mail est déjà utilisé. Veuillez choisir un autre e-mail.",
    });
  });

  it("should return status 400 if role is invalid", async () => {
    const req = {
      body: {
        email: "newuser@example.com",
        password: "password123",
        role: "invalidRole",
        // other properties as needed
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userModel.findOne = jest.fn().mockResolvedValue(null);
    // Assuming roleModel.findOne is properly mocked to return null for invalid role

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Rôle invalide.",
    });
  });

  it("should return status 400 if user tries to register as a manager", async () => {
    const req = {
      body: {
        email: "manager@example.com",
        password: "password123",
        role: "manager",
        // other properties as needed
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userModel.findOne = jest.fn().mockResolvedValue(null);
    // Assuming roleModel.findOne is properly mocked to return a valid role for manager

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'vous avez pas le droit de vous inscrire en tant que manager',
    });
  });

  it("should successfully register user and return status 201 with token", async () => {
    const req = {
      body: {
        email: "newuser@example.com",
        password: "password123",
        role: "user",
        first_name: "John",
        last_name: "Doe",
        // other properties as needed
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    userModel.findOne = jest.fn().mockResolvedValue(null);
    // Assuming roleModel.findOne is properly mocked to return a valid role for user

    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
    // Mocking bcrypt.hash to return a hashed password

    jwtToken.generateAccessToken = jest.fn().mockReturnValue("mockedAccessToken");
    // Mocking generateAccessToken from jwtToken service

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "activer votre compte, veuillez vérifier votre e-mail",
      user: {
        email: "newuser@example.com",
        role: "user",
        // other properties as needed
      },
      token: "mockedAccessToken",
    });
  });


});
