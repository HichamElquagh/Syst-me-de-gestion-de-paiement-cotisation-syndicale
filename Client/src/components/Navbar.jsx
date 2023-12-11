
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../slices/authSlice';
import { clearCredentials } from '../slices/authSlice';



const Navbar = ()=>{
    console.log(getUserInfo);
    const dispatch = useDispatch();
    const userData = useSelector(getUserInfo)
    const handleLogout = () => {
        // Dispatch the clearCredentials action when the user clicks the logout button
        dispatch(clearCredentials());
      };

    return(
        <>
        <section className="w-full px-8 text-gray-700 bg-white">
    <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
            <a href="#_" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">AI<span className="text-indigo-600">.</span></span>
            </a>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                <a href="#_" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</a>
                <a href="#_" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Client</a>
                <a href="#_" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#_" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Facture</a>
            </nav>
        </div>
        {userData === null ? (
        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <Link to="/login" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </Link>
            <Link to="register" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Sign up
            </Link>
        </div>
        ) : (
            <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            <div className="group relative inline-block">
              <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center group">
                <span className="mr-1">{userData.first_name}</span>
                <svg className="fill-current h-4 w-4 transition-transform transform group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                <li className=""><button onClick={handleLogout} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Logout</button></li>
              </ul>
            </div>
          </div>
          
        )}
    </div>
</section>
        </>
    )
}
export default Navbar