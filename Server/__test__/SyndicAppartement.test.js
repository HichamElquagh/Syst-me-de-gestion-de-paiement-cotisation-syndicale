const {
    createAppartement,
    getAppartementById,
    deleteAppartement,
    updateAppartement,
    getAllAppartements,
} = require("../controllers/syndic.controller");
const Appartement = require("../models/appartement.model");
const PaiementModel = require("../models/payment.model");

jest.mock("../models/appartement.model");
jest.mock("../models/payment.model");

const req = {
    body: {
        floor_number: 1,
        door_number: 101,
        status: "Occupied",
        tenant: "John Doe",
    },
    user: {
        _id: "123456789",
    },
};

const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
};

describe("Syndic Controller Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new appartement and return success message", async () => {
        const savedAppartement = {
            _id: "123456789",
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
            user: "123456789",
        };

        Appartement.mockReturnValueOnce({
            save: jest.fn().mockResolvedValue(savedAppartement),
        });

        await createAppartement(req, res);

        expect(Appartement).toHaveBeenCalledWith({
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
            user: "123456789",
        });
        expect(res.json).toHaveBeenCalledWith({
            messageS: "Appartement created with success",
            data: savedAppartement,
        });
    });

    it("should create a new appartement and a payment if status is not 'Vacant'", async () => {
        const savedAppartement = {
            _id: "123456789",
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
            user: "123456789",
        };

        Appartement.mockReturnValueOnce({
            save: jest.fn().mockResolvedValue(savedAppartement),
        });

        await createAppartement(req, res);

        expect(Appartement).toHaveBeenCalledWith({
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
            user: "123456789",
        });
        expect(PaiementModel.create).toHaveBeenCalledWith({
            appartement: "123456789",
        });
        expect(res.json).toHaveBeenCalledWith({
            messageS: "Appartement created with success",
            data: savedAppartement,
        });
    });

    it("should return error message if failed to save the appartement", async () => {
        Appartement.mockReturnValueOnce({
            save: jest
                .fn()
                .mockRejectedValue(new Error("Failed to save appartement")),
        });

        await createAppartement(req, res);

        expect(Appartement).toHaveBeenCalledWith({
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
            user: "123456789",
        });
        expect(res.json).toHaveBeenCalledWith({
            error: "Failed to save appartement",
        });
    });

    it("should return error message if an error occurs during the creation of the appartement", async () => {
        const errorMessage = "Internal Server Error";
        const error = new Error(errorMessage);

        Appartement.mockReturnValueOnce({
            save: jest.fn().mockRejectedValue(error),
        });

        await createAppartement(req, res);

        expect(Appartement).toHaveBeenCalledWith({
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
            user: "123456789",
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe("Syndic Controller Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Existing tests...
    const req = {
        body: {
            floor_number: 1,
            door_number: 101,
            status: "Occupied",
            tenant: "John Doe",
        },
        user: {
            _id: "123456789",
        },
        params: {
            appartementId: "987654321",
        },
    };

    const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };

    it("should get an existing appartement by ID and return it", async () => {
        const existingAppartement = {
            _id: "987654321",
            floor_number: 2,
            door_number: 202,
            status: "Vacant",
            tenant: "",
            user: "123456789",
        };

        Appartement.findById.mockResolvedValueOnce(existingAppartement);

        await getAppartementById(req, res);

        expect(Appartement.findById).toHaveBeenCalledWith("987654321");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(existingAppartement);
    });

    it("should return an error message if the appartement does not exist", async () => {
        Appartement.findById.mockResolvedValueOnce(null);

        await getAppartementById(req, res);

        expect(Appartement.findById).toHaveBeenCalledWith("987654321");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Appartement not found",
        });
    });

    it("should return an error message if failed to get the appartement by ID", async () => {
        const errorMessage = "Internal Server Error";
        const error = new Error(errorMessage);

        Appartement.findById.mockRejectedValueOnce(error);

        await getAppartementById(req, res);

        expect(Appartement.findById).toHaveBeenCalledWith("987654321");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe("Syndic Controller Tests", () => {
    // Existing tests...

    it("should delete an existing appartement by ID and return success message", async () => {
        const deletedAppartement = {
            _id: "987654321",
            floor_number: 2,
            door_number: 202,
            status: "Vacant",
            tenant: "",
            user: "123456789",
        };

        Appartement.findByIdAndDelete.mockResolvedValueOnce(deletedAppartement);

        const req = {
            params: {
                appartementId: "987654321",
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await deleteAppartement(req, res);

        expect(Appartement.findByIdAndDelete).toHaveBeenCalledWith("987654321");
        expect(res.json).toHaveBeenCalledWith({
            messageS: "Appartement deleted successfuly",
        });
    });

    it("should return an error message if the appartement to delete is not found", async () => {
        Appartement.findByIdAndDelete.mockResolvedValueOnce(null);

        const req = {
            params: {
                appartementId: "987654321",
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await deleteAppartement(req, res);

        expect(Appartement.findByIdAndDelete).toHaveBeenCalledWith("987654321");
        expect(res.json).toHaveBeenCalledWith({
            messageE: "Appartement not found",
        });
    });

    it("should return an error message if failed to delete the appartement", async () => {
        const errorMessage = "Internal Server Error";
        const error = new Error(errorMessage);

        Appartement.findByIdAndDelete.mockRejectedValueOnce(error);

        const req = {
            params: {
                appartementId: "987654321",
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await deleteAppartement(req, res);

        expect(Appartement.findByIdAndDelete).toHaveBeenCalledWith("987654321");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe("Syndic Controller Tests", () => {
    // Existing tests...

    it("should update an existing appartement and return success message", async () => {
        const updatedAppartement = {
            _id: "987654321",
            floor_number: 2,
            door_number: 202,
            status: "Occupied",
            tenant: "Jane Doe",
            user: "123456789",
        };

        Appartement.findOneAndUpdate.mockResolvedValueOnce(updatedAppartement);

        const req = {
            params: {
                appartementId: "987654321",
            },
            body: {
                floor_number: 2,
                door_number: 202,
                status: "Occupied",
                tenant: "Jane Doe",
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await updateAppartement(req, res);

        expect(Appartement.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "987654321" },
            {
                floor_number: 2,
                door_number: 202,
                status: "Occupied",
                tenant: "Jane Doe",
            },
            { new: true }
        );
        expect(PaiementModel.create).toHaveBeenCalledWith({
            appartement: "987654321",
        });
        expect(res.json).toHaveBeenCalledWith({
            messageS: "Appartement updated succussfuly",
        });
    });

    it("should return an error message if the appartement to update is not found", async () => {
        Appartement.findOneAndUpdate.mockResolvedValueOnce(null);

        const req = {
            params: {
                appartementId: "987654321",
            },
            body: {
                floor_number: 2,
                door_number: 202,
                status: "Occupied",
                tenant: "Jane Doe",
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await updateAppartement(req, res);

        expect(Appartement.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "987654321" },
            {
                floor_number: 2,
                door_number: 202,
                status: "Occupied",
                tenant: "Jane Doe",
            },
            { new: true }
        );
        expect(res.json).toHaveBeenCalledWith({
            messageE: "Appartement not found",
        });
    });

    it("should return an error message if failed to update the appartement", async () => {
        const errorMessage = "Internal Server Error";
        const error = new Error(errorMessage);

        Appartement.findOneAndUpdate.mockRejectedValueOnce(error);

        const req = {
            params: {
                appartementId: "987654321",
            },
            body: {
                floor_number: 2,
                door_number: 202,
                status: "Occupied",
                tenant: "Jane Doe",
            },
        };

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await updateAppartement(req, res);

        expect(Appartement.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "987654321" },
            {
                floor_number: 2,
                door_number: 202,
                status: "Occupied",
                tenant: "Jane Doe",
            },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});