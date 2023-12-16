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

const AddModalTenant = ({isOpenModal, handleAddModalToggle}) => {



  const [formData, setFormData] = useState({
    full_name: "",
    cin: "",
    phone: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleAddTenant = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/syndic/addTenant',
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

      handleAddModalToggle();


    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };
  

  const resetForm = () => {
    setFormData({
      full_name: "",
      cin: "",
      phone: "",
    });
  };
 
  

  return (
    <Dialog
      size="xs"
      open={isOpenModal}
      handler={() => {
        handleAddModalToggle();
        // Appeler la fonction resetForm à la fermeture du modal
        resetForm();
      }}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit Appartment
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
          type="number"
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
          onClick={handleAddTenant}
            fullWidth
          >
            Add Tenant
          </Button>
          <Button  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddModalToggle} fullWidth>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default AddModalTenant;
