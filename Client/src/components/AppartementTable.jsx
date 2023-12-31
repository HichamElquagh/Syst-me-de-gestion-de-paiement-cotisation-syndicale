    import React, { useState , useEffect } from "react";
    import axios from "axios";
    import toast from "react-hot-toast";
    import EditModalAppartement from "./modals/EditModalAppartement";

    import {
        Button,
        Dialog,
        Card,
        CardBody,
        CardFooter,
        Typography,
        Input,
        Checkbox,
        Select,
        Option,
      } from "@material-tailwind/react";

    const AppartementTable = () => {
      const [errors , setErrors] = useState({})
      const [tenants , setTenants] = useState([])
      const [isEditModalOpen, setEditModalOpen] = useState(false);
      const [editAppartmentId, setEditAppartmentId] = useState(null);
        const [isAddModalOpen, setAddModalOpen] = useState(false);
        const [apartments, setApartments] = useState([]);
      const [formData, setFormData] = useState({
        floor_number: "",
        door_number: "",
        status: "",
        tenant: "",
      });

      useEffect(() => {
        fetchApartments()
        fetchTenants()
          }, []); 

        const fetchApartments = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/syndic/appartements",
              { withCredentials: true }

            );
            if (response) {
              
              setApartments(response.data); 
            }
          } catch (error) {
            console.error("Error fetching apartments:", error);
          }
        };

        const fetchTenants = async () => {
          try {
            const response = await axios.get('http://localhost:3001/syndic/getAllTenants', { withCredentials: true }
            );
            console.log(response);
            setTenants(response.data);
          } catch (error) {
            console.error('Error fetching tenants:', error);
          }
        };
    
      const handleAddModalToggle = () => {
        setAddModalOpen((prev) => !prev);
        if (!isAddModalOpen) {
          setFormData({
            floor_number: "",
            door_number: "",
            status: "",
            tenant: "",
          });
        }
        fetchApartments();

      };

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
          console.log(formData);
        };
        const handleSelectChange = (name, value) => {
          console.log(formData);
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        };


        const validateForm= ()=>{
          const newErrors = {}


          if(!formData.door_number.trim()){
            newErrors.door_number = "door number is required"
          }
          if(!formData.floor_number.trim()){
            newErrors.floor_number = "Floor number is required"
          }
          if(!formData.status.trim()){
            newErrors.status = "Status is required"
          }
          if(!formData.tenant.trim()){
            newErrors.tenant = "Tenant is required"
          }
          setErrors(newErrors)
          return Object.keys(newErrors).length === 0
        }
      const handleAddAppartement =  async () => {
        if(!validateForm()){
          return;
        }
        try {
            const response = await axios.post('http://localhost:3001/syndic/addAppartement', {
                floor_number: formData.floor_number,
                door_number: formData.door_number,
                status: formData.status,
                tenant : formData.tenant  ,
            
        },{ withCredentials: true }
        );
        console.log(response);

        if (response.data.messageS) {
          toast.success(response.data.messageS, {
            autoClose: 4000,
          });
          
        } else {
          toast.error(response.data.messageE, {
            autoClose: 4000,
          });
        }

        
        handleAddModalToggle();

            
        } catch (error) {
            console.log(error.message);
        }

      };


      const handleEditModalOpen = (id) => {
        setEditAppartmentId(id);
        setEditModalOpen(true);
      };
    
      const handleEditModalClose = () => {
        setEditModalOpen(false);
        setEditAppartmentId(null);
        fetchApartments();

      };



      const handleRemoveModalOpen= async (id)=>{

       const response = await axios.delete(`http://localhost:3001/syndic/removeAppartement/${id}`);

       if (response) {
        toast.success(response.data.messageS, {
          autoClose: 4000,
        });
        fetchApartments();
        
       }else{
        toast.success(response.data.messageE, {
          autoClose: 4000,
        });

       }

      }
    

  console.log(apartments);


      return (
        <div className="flex mt-[6rem] items-center bg-white">
        <div className="p-6 overflow-scroll w-full mx-auto max-w-7xl">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-gray-900">Appartements</h1>
            <Button onClick={handleAddModalToggle}>Add Appartment</Button>
              <Dialog
                size="xs"
                open={isAddModalOpen}
                handler={handleAddModalToggle}
                className="bg-transparent shadow-none"
              >
                <Card className="mx-auto w-full max-w-[24rem]">
                  <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                      Add Appartment
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
                      error ={errors.floor_number}
                    />
                    {errors.floor_number && <p className="text-red-500 text-sm ">{errors.floor_number}</p>}

                    <Typography className="-mb-2" variant="h6">
                      Door Number
                    </Typography>
                    <Input
                      name="door_number"
                      value={formData.door_number}
                      onChange={handleInputChange}
                      label="Door Number"
                      size="lg"
                      error = {errors.door_number}
                    />
                    {errors.door_number && <p className="text-red-500 text-sm ">{errors.door_number}</p>}

                    <Typography className="-mb-2" variant="h6">
                      Status
                    </Typography>

                    <Select
                      name="status" 
                      value={formData.status}
                      onChange={(value) => handleSelectChange('status', value)}
                      label="Status"
                      size="lg"  
                      error={errors.status}
                    >
                      <Option value="Occupied">Occupied

                    </Option>
                    <Option value="Vacant">Vacant

                    </Option>

                    </Select>
                    {errors.status && <p className="text-red-500 text-sm ">{errors.status}</p>}


                    <Typography className="-mb-2" variant="h6">
                      Tenant 
                    </Typography>
                    <Select
                      name="tenant"
                      value={formData.tenant}
                      onChange={(value) => handleSelectChange('tenant', value)}
                      label="Tenant"
                      size="lg"
                      error={errors.status}
                    >
                  {tenants.map((tenant) => (
                    <Option key={tenant._id} value={tenant._id}>
                      {tenant.full_name}
                    </Option>
                  ))}
                </Select>
                {errors.tenant && <p className="text-red-500 text-sm ">{errors.tenant}</p>}

                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleAddAppartement} fullWidth>
                      Add Appartment
                    </Button>
                  </CardFooter>
                </Card>
              </Dialog>

          </div>
          <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Floor Number</p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Door Number</p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Owner</p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Edit</p>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Remove</p>
                  </th>
                </tr>
              </thead>

              <tbody>
    {apartments.map((apartment, index) => {
      if (!apartment || typeof apartment !== 'object') {
        return null; 
      }

      return (
        <tr key={index}>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex items-center gap-3">
              <img
                src="https://img.freepik.com/free-photo/3d-rendering-luxury-modern-living-room-with-fabric-sofa_105762-2186.jpg?size=626&ext=jpg&ga=GA1.1.92304765.1695715663&semt=sph"
                alt="zz"
                className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
              />
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                {apartment.floor_number || 'N/A'}
              </p>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {apartment.door_number || 'N/A'}
            </p>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="w-max">
              <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${apartment.status === 'Occupied' ? 'bg-green-500/20 text-green-900' : 'bg-red-500/20 text-red-900'} py-1 px-2 text-xs rounded-md`} style={{ opacity: 1 }}>
                <span className="">{apartment.status || 'N/A'}</span>
              </div>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {apartment.tenant.full_name || 'N/A'}
            </p>
          </td>
          
          <td className="p-4 border-b border-blue-gray-50">
            <Button
            className="bg-blue-500 hover:bg-blue-700"
              onClick={() => handleEditModalOpen(apartment._id)}
            >
              Edit
            </Button>
          </td>
          <td className="p-4 border-b ">
            <Button className=" hover:bg-red-700 bg-red-500"
              onClick={() => handleRemoveModalOpen(apartment._id)}
            >
              Remove
            </Button>
          </td>

        </tr>
      );
    })}
  </tbody>

        

            </table>
            <EditModalAppartement
        id={editAppartmentId}
        isEditModalOpen={isEditModalOpen}
        handleAddModalToggle={handleEditModalClose}
      />
            {/* <div className="w-full pt-5 px-4 mb-8">
              <div className="text-sm text-gray-700 py-1">
                Made with <a className="text-gray-700 font-semibold" href="https://www.material-tailwind.com/?ref=tailwindcomponents" target="_blank" rel="noopener noreferrer">Material Tailwind</a> by <a href="https://www.creative-tim.com?ref=tailwindcomponents" className="text-gray-700 font-semibold" target="_blank" rel="noopener noreferrer"> Creative Tim</a>.
              </div>
            </div> */}
          </div>
        </div>
      );
    }

    export default AppartementTable;
