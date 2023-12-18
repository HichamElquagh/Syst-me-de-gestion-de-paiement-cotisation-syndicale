import axios from "axios";
import React, { useEffect, useState } from "react";
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

const PaiementTable = () => {
  const [formData, setFormData] = useState({
    amount: "",
   month: "",
    year: "",
  });
  const [paiementId , setPaiementId] = useState("")
  const [paidPaiements, setPaidPaiements] = useState([]);
  const [pendingPaiements, setPendingPaiements] = useState([]);

  const [openPaiementModal , setPaiementModal] = useState(false)

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/syndic/AllPayments',{withCredentials : true});
      console.log(response.data);

      if (response && response.data) {
        setPaidPaiements(response.data.paidPayments);
        setPendingPaiements(response.data.pendingPayments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleInputChange =  (e)=>{
      
    const { name , value} = e.target;
    setFormData((prevData=>({
      ...prevData,
      [name] : value,
    })))
      console.log(formData);


  }
  const handleAddPaiement = async ()=>{
       
      const response = await axios.put('http://localhost:3001/syndic/AddPayment',{
      amount : formData.amount,
      paiement_id : paiementId,
      month : formData.month,
      year : formData.year
    },{
      withCredentials : true
    })


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
      handlePaiementModalClose()
      
    }
  


  const handlePaiementModal = (id)=>{
    setPaiementModal(true)
    setPaiementId(id)
    
  }
  // console.log("dd", appartementId);

  const handlePaiementModalClose = ()=>{
    setPaiementModal(false)
    fetchPayments()



  }

  const renderPaymentRows = (payments) => {
    return payments.map((payment) => (
      <tr key={payment._id}>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
              src="https://img.freepik.com/free-photo/3d-rendering-luxury-modern-living-room-with-fabric-sofa_105762-2186.jpg?size=626&ext=jpg&ga=GA1.1.92304765.1695715663&semt=sph"
              alt="zz"
              className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
            />
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
              {payment.appartement.door_number || 'N/A'}
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
              {payment.appartement.floor_number || 'N/A'}
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                    src="data:image/jpeg;base64,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"
                    alt="zz"
                    className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                     />
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                    {payment.appartement.tenant.full_name}                    </p>
                  </div> 
                </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">${payment.amount}</p>
        </td>
        {payment.status !== 'Paid' && (
          <>
            
            <td className="p-4 border-b border-blue-gray-50">
              <div className={`w-max ${payment.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}/20 text-green-900 py-1 px-2 text-xs rounded-md`} style={{ opacity: 1 }}>
                <span className="capitalize">{payment.status.toLowerCase()}</span>
              </div>
            </td>
            <td>
              <Button onClick={() => handlePaiementModal(payment._id)}>Paiement Now</Button>
            </td>
          </>
        )}
        {payment.status === 'Paid' && (
          <>
            <td className="p-4 border-b border-blue-gray-50">
              <div className={`w-max ${payment.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}/20 text-green-900 py-1 px-2 text-xs rounded-md`} style={{ opacity: 1 }}>
                <span className="capitalize">{payment.status.toLowerCase()}</span>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{payment.month}</p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{payment.year}</p>
            </td>
          </>
        )}
      </tr>
    ));
  };
  

  return (
    <div>
      <div className="flex mt-[6rem] items-center bg-white">
        <div className="p-6 overflow-scroll w-full mx-auto max-w-7xl">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-gray-900">Pending Paiement</h1>
          </div>
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Door Number</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Floor Number</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Tenant</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Amount</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Pay Now</p>
                </th>
              </tr>
              
              
            </thead>
            <tbody>
              {renderPaymentRows(pendingPaiements)}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex mt-[6rem] items-center bg-white">
        <div className="p-6 overflow-scroll w-full mx-auto max-w-7xl">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-gray-900">Paid Paiement</h1>
          </div>
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Door Number</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Floor Number</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Tenant</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Amount</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                </th>             
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Month</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Years</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {renderPaymentRows(paidPaiements)}
            </tbody>
          </table>
        </div>
      </div>

<Dialog
size="xs"
open={openPaiementModal}
handler={handlePaiementModal}
className="bg-transparent shadow-none"
>
<Card className="mx-auto w-full max-w-[24rem]">
  <CardBody className="flex flex-col gap-4">
    <Typography variant="h4" color="blue-gray">
      Add Paiemnt
    </Typography>
    <Typography className="-mb-2" variant="h6">
      Amount
    </Typography>
    <Input
      name="amount"
      value={formData.amount}
      onChange={handleInputChange}
      label="Amount DH "
      size="lg"
    />
    <Typography className="-mb-2" variant="h6">
      month
    </Typography>
    <Input
      name="month"
      value={formData.month}
      onChange={handleInputChange}
      label="Month"
      size="lg"
    />
    <Typography className="-mb-2" variant="h6">
      Years
    </Typography>
    <Input
      name="year"
      value={formData.year}
      onChange={handleInputChange}
      label="Years"
      size="lg"
    />
  </CardBody>
  <CardFooter className="pt-0">
    <Button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  
    onClick={handleAddPaiement} 
    fullWidth>
      Add Paiement
    </Button>
    <Button  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handlePaiementModalClose} fullWidth>
      Cancel
    </Button>
  </CardFooter>
</Card>
</Dialog>
</div>

  );
};

export default PaiementTable;
