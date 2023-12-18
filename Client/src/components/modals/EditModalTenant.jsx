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

const EditModalTenant = ({ id, isEditModal, handleEditModalClose }) => {

  const [formData, setFormData] = useState({
    full_name: "",
    cin: "",
    phone: "",
  });

  useEffect(() => {
      if (id !== null) {
        fetchData();
      }
  }, [id]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/syndic/getTenantById/${id}`
      );
      console.log(response);

      if (response) {
        setFormData(response.data); // Assuming the API response has the apartment data
      }
    } catch (error) {
      console.error("Error fetching apartment data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditTenant = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/syndic/updateTenant/${id}`,
        {
          full_name: formData.full_name,
          cin: formData.cin,
          phone: formData.phone,
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

      handleEditModalClose();
       // Close the modal after editing

    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };
  

  return (
    <Dialog
      size="xs"
      open={isEditModal}
      handler={handleEditModalClose}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit Tenant
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Full Name
          </Typography>
          <Input
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            label="Full Name"
            size="lg"
          />
          <Typography className="-mb-2" variant="h6">
            CIN
          </Typography>
          <Input
            name="cin"
            value={formData.cin}
            onChange={handleInputChange}
            label="CIN"
            size="lg"
          />
          <Typography className="-mb-2" variant="h6">
            Phone
          </Typography>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            label="Phone"
            size="lg"
          />
          
        </CardBody>
        <CardFooter className="pt-0">
          <Button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditTenant}
            fullWidth
          >
            Update Tenant
          </Button>
          <Button  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditModalClose} fullWidth>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default EditModalTenant;
