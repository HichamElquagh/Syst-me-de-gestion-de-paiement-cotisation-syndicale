import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

const PaiementTable = () => {
  const [paidPaiements, setPaidPaiements] = useState([]);
  const [pendingPaiements, setPendingPaiements] = useState([]);

  const [openPaiementModal , setPaiementModal] = useState(false)

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/syndic/AllPayments');
      console.log(response.data);

      if (response && response.data) {
        setPaidPaiements(response.data.paidPayments);
        setPendingPaiements(response.data.pendingPayments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };


  const handlePaiementModal = ()=>{
    setPaiementModal(true)
    
  }

  const handlePaiementModalClose = ()=>{
    setPaiementModal(false)


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
          {/* Render other columns based on your payment structure */}
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">${payment.amount}</p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{payment.date}</p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className={`w-max ${payment.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}/20 text-green-900 py-1 px-2 text-xs rounded-md`} style={{ opacity: 1 }}>
            <span className="capitalize">{payment.status.toLowerCase()}</span>
          </div>
        </td>
        <td>
        <Button onClick={handlePaiementModal}>Paiement Now</Button>
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
                      // value={formData.status}
                      // onChange={handleInputChange}
                      label="Amount DH "
                      size="lg"
                    />
                    <Typography className="-mb-2" variant="h6">
                      month
                    </Typography>
                    <Input
                      name="tenant"
                      // value={formData.tenant}
                      // onChange={handleInputChange}
                      label="Month"
                      size="lg"
                    />
                    <Typography className="-mb-2" variant="h6">
                      Years
                    </Typography>
                    <Input
                      name="Years"
                      // value={formData.tenant}
                      // onChange={handleInputChange}
                      label="Years"
                      size="lg"
                    />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  fullWidth>
                      Add Paiement
                    </Button>
                    <Button  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handlePaiementModalClose} fullWidth>
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </Dialog>
          </td>
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
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Amount</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Date</p>
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
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Amount</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Date</p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Status</p>
                </th>             
              </tr>
            </thead>
            <tbody>
              {renderPaymentRows(paidPaiements)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaiementTable;
