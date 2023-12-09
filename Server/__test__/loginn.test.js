const login = require("../controllers/auth.controller").login;
const userModel = require("../models/users");
const jwtToken = require("../services/jwtToken");
const mailer = require("../services/verifEmail");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

jest.mock("../services/jwtToken");


describe("test parti login ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 404 if email is not allowed to be empty", async () => {
    const req = {
      body: {
        email: "hicham@gmail.com",
        password: "hicham",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };



    userModel.findOne = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue(null),
  });


    await login(req, res);
    // await jest.spyOn(userModel.findOne).mockResolvedValue(null);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Utilisateur introuvable",
    });
  });


it("should return status 200 and token if login credentials are correct", async () => {
  const req = {
    body: {
      email: "correctemail@example.com",
      password: "correctpassword",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };

  const mockUser = {
    email: "correctemail@example.com",
    password: await bcrypt.hash("correctpassword", 10),
    role: { role_name: "user" },
    first_name: "John", // Assuming first_name is included in the response
    last_name: "Doe",   // Assuming last_name is included in the response
  };

  userModel.findOne = jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue(mockUser),
});


await jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);

const user = { email: 'hicham@gmail.com' };

const validToken = jwt.sign(user, 'lkjlkjlkj');

jwt.sign = jest.fn().mockReturnValue(validToken);



  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: "Vous avez crée un compte avec success",
    data: {
      first_name: "John",
      last_name: "Doe",
      email: "correctemail@example.com",
      role: "user",
    },
  });

  // Assuming you have a cookie set in your login function
  
});

it("should return status 400 if password is incorrect", async () => {
  const req = {
    body: {
      email: "correctemail@example.com",
      password: "incorrectpassword",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockUser = {
    email: "correctemail@example.com",
    password: await bcrypt.hash("correctpassword", 10),
    role: { role_name: "user" },
  };

  userModel.findOne = jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue(mockUser),
});
  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    message: "Mot de passe incorrect",
  });
});
  
});