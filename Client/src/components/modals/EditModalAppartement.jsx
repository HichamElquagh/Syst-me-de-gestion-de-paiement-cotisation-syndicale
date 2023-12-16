import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

const EditModalAppartement = ({ id, isEditModalOpen, handleAddModalToggle }) => {

  const [formData, setFormData] = useState({
    floor_number: "",
    door_number: "",
    status: "",
    tenant: "",
  });

  useEffect(() => {
    // Fetch data for the specified apartment ID (id) and set the form data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/syndic/getAppartement/${id}`
        );
        console.log(response);

        if (response) {
          setFormData(response.data); // Assuming the API response has the apartment data
        }
      } catch (error) {
        console.error("Error fetching apartment data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditAppartement = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/syndic/updateAppartement/${id}`,
        {
          floor_number: formData.floor_number,
          door_number: formData.door_number,
          status: formData.status,
          tenant: formData.tenant,
        }
      );

      if (response) {
        toast.success(response.data.messageS, {
          autoClose: 4000,
        });

        // Do something with the updated apartment data

      } else {
        toast.error(response.data.messageE, {
          autoClose: 4000,
        });
      }

      handleAddModalToggle(); // Close the modal after editing

    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };
  

  return (
    <Dialog
      size="xs"
      open={isEditModalOpen}
      handler={handleAddModalToggle}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit Appartment
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Floor Number
          </Typography>
          <Input
            name="floor_number"
            value={formData.floor_number}
            onChange={handleInputChange}
            label="Floor Number"
            size="lg"
          />
          <Typography className="-mb-2" variant="h6">
            Door Number
          </Typography>
          <Input
            name="door_number"
            value={formData.door_number}
            onChange={handleInputChange}
            label="Door Number"
            size="lg"
          />
          <Typography className="-mb-2" variant="h6">
            Status
          </Typography>
          <Input
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            label="Status"
            size="lg"
          />
          <Typography className="-mb-2" variant="h6">
            Tenant ID
          </Typography>
          <Input
            name="tenant"
            value={formData.tenant}
            onChange={handleInputChange}
            label="Tenant ID"
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditAppartement}
            fullWidth
          >
            Update Appartment
          </Button>
          <Button  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddModalToggle} fullWidth>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default EditModalAppartement;
