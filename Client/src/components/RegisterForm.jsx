import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
 
  
  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required ';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Stop registration if there are validation errors
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password : confirmPassword
      });
      console.log(response.data);

      if (response.data.messageS !== null) {
        toast.success(response.data.messageS, {
          autoClose: 4000,
        });
        navigate('/login')
      } else {
        toast.error(response.data.messageE, {
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement', error);
      toast.error('Erreur lors de l\'enregistrement', {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-h-screen">
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Register</h2>
            <form className="mt-6" onSubmit={handleRegister}>
              {/* First Name */}
              <div className="mt-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${errors.firstName ? 'border-red-500' : ''}`}
                  
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="mt-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${errors.lastName ? 'border-red-500' : ''}`}
                  
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div className="mt-4">
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                  
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                  minLength="6"
                  
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="mt-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  minLength="6"
                  
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Register
              </button>
            </form>
            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
           
          <div className="text-sm flex justify-between items-center mt-3">
              <p>If you  have an account...</p>
              <Link to="/login" className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">
                Login
              </Link>
            </div>
          </div>
          {/* Image */}
          <div className="w-1/2 md:block hidden">
            <img
              src="https://img.freepik.com/free-photo/modern-business-center_1127-3157.jpg?size=626&ext=jpg&ga=GA1.1.92304765.1695715663&semt=ais"
              className="rounded-2xl h-full"
              alt="page img"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
