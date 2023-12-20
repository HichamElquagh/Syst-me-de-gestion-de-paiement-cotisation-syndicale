import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import logo from '../assets/logo.png'


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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    amount: "",
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
      // console.log(formData);


  }

  const validateForm =()=>{
    const newErrors = {}
    if(!formData.amount.trim()){
      newErrors.amount = "amount is required"
    }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0;


  }
  const handleAddPaiement = async ()=>{

    if (!validateForm()) {
      return ;
    }
       
      const response = await axios.put('http://localhost:3001/syndic/AddPayment',{
      amount : formData.amount,
      paiement_id : paiementId
    },{
      withCredentials : true
    })


      if (response) {
        toast.success(response.data.messageS, {
          autoClose: 4000,
        });


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

  const handlePrint = (e) => {

    const objectData = {
      tenant: e.appartement.tenant.full_name,
      appartementDoor: e.appartement.door_number,
      appartementFloor: e.appartement.floor_number,
      montant: e.amount+ " DH",
      Status: e.status,
      DatePaiemnt:format(new Date(e.date), 'dd MMMM yyyy', { locale: fr }),
    };


  
    const pdf = new jsPDF();  
    // // Logo
    const logoWidth = 40;
    const logoHeight = 40;
    
    pdf.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);
    // Header
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 102, 204); // Bleu foncé
    pdf.text('Payment Receipt', 20, 30);
  
    // Subheader
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0); // Noir
    pdf.text('Details', 20, 50);
  
    // Content
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
  
    const startY = 60;
    const lineHeight = 10;
  
    Object.entries(objectData).forEach(([key, value], index) => {
      pdf.text(`${key}:`, 20, startY + index * lineHeight);
      pdf.text(`${value}`, 70, startY + index * lineHeight);
    });
  
    // Separator line
    pdf.line(20, startY + Object.keys(objectData).length * lineHeight + 5, 190, startY + Object.keys(objectData).length * lineHeight + 5);
  
    // Payment Section
    const paymentSectionY = startY + (Object.keys(objectData).length + 2) * lineHeight + 10;
    pdf.text('Payment Section', 20, paymentSectionY);
    pdf.line(20, paymentSectionY + 5, 190, paymentSectionY + 5);
  
    // Footer
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(10);
    pdf.text('Thank you for your payment!', 20, paymentSectionY + 15);
  
    // Status color
    const statusColor = e.status === 'Paid' ? [0, 128, 0] : [255, 0, 0]; 
    pdf.setFillColor(...statusColor);
    pdf.rect(20, paymentSectionY + 20, 170, lineHeight, 'F');
  
    pdf.setTextColor(255, 255, 255); 
    pdf.text(`Status: ${e.status}`, 20, paymentSectionY + 25);
  
    pdf.save(`${e.appartement.tenant.full_name}_Receipt.pdf`);
  };

  const handlePrintAllPaidTenants = (paidPayments) => {
    const pdf = new jsPDF();
    const logoWidth = 40;
    const logoHeight = 40;
    const logoMargin = 10; 
  
    pdf.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);
  
    pdf.setFontSize(12); 
    pdf.setFont('helvetica', 'bold');
    pdf.text('All Paid Tenants Receipt', 20, 20);
  
    const startY = 30 + logoHeight + logoMargin; 
    const columnWidths = [20, 30, 30, 30, 30, 20]; 
    const columnOffsets = [0, 20, 20, 30, 20, 10]; 
    const headers = ['Tenant   ', 'Door Num   ', 'Floor Num   ', 'Amount   ', 'Status', '         Date'];
  
  
    pdf.setFillColor(200, 220, 255); 
    pdf.rect(20, startY, pdf.internal.pageSize.width - 25, 20, 'F');
    pdf.setTextColor(0, 0, 0); 
    pdf.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
      pdf.text(header, 20 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + columnOffsets[index], startY + 16);
    });
  
    // Draw data rows
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0); // Data text color
    paidPayments.forEach((payment, index) => {
      const rowData = [
        payment.appartement.tenant.full_name,
        payment.appartement.door_number,
        payment.appartement.floor_number,
        payment.amount,
        payment.status,
        format(new Date(payment.date), 'dd MMMM yyyy', { locale: fr }),
      ];
  
      // Draw data row background
      const rowHeight = 20; // Adjust row height
      pdf.setFillColor(index % 2 === 0 ? 245 : 255, 255, 255); // Alternate row colors
      pdf.rect(20, startY + (index + 1) * rowHeight, pdf.internal.pageSize.width - 40, rowHeight, 'F');
  
      // Draw data row text
      rowData.forEach((data, i) => {
        pdf.text(String(data), 20 + columnOffsets[i] + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), startY + (index + 1) * rowHeight + 16);
      });
  
      // Separator line
      pdf.setDrawColor(200, 200, 200); // Line color
      pdf.line(20, startY + (index + 2) * rowHeight, pdf.internal.pageSize.width - 20, startY + (index + 2) * rowHeight);
    });
  
    // Calculate the end position of the table
    const endY = pdf.internal.pageSize.height - 20;
  
    // Add a margin to avoid overlapping with the footer
    const marginBottom = 10;
  
    // If the table goes beyond the end position, add a new page
    if (startY + (paidPayments.length + 2) * 20 + marginBottom > endY) {
      pdf.addPage();
    }
  
    pdf.save('All_Paid_Tenants_Receipt.pdf');
  };
  
  
  
  
    
  


  

  const renderPaymentRows = (payments) => {
    if (!payments || payments.length === 0) {
      return (
        <div>
          <p>No payment available</p>
        </div>
      );
    }else{

  
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
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{payment.amount} DH</p>
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
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">    {format(new Date(payment.date), 'dd MMMM yyyy', { locale: fr })}</p>
            </td>

            <td
                className="p-4 border-b border-blue-gray-50"
                onClick={() => handlePrint(payment)} 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  data-slot="icon"
                  className="w-6 h-6 transition-transform duration-300 transform"

                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                  />
                </svg>
              </td>

          </>
        )}
      </tr>
    ));
  }

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
            <div className="flex justify-between">
            <p className="me-4 text-xl font-bold text-blue-gray-900 ">  Download All</p>
            <button onClick={()=>handlePrintAllPaidTenants(paidPaiements)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="green" data-slot="icon" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75v-9A2.25 2.25 0 0 0 18.75 7H17M8 10l4 4 4-4M12 5v8"></path>
              </svg>
            </button>
            </div>

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
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Date Paiment</p>
                </th>

                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Print</p>
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
    {errors.amount && <p className="text-red-500 text-sm ">{errors.amount}</p>}
    <Input
      name="amount"
      value={formData.amount}
      onChange={handleInputChange}
      label="Amount DH "
      size="lg"
      error={errors.amount} 
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
