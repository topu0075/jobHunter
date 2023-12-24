import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut();
  };

  return (
    <>
      <div className='flex flex-row navbar bg-base-100 my-2 md:my-10'>
        <div className='w-full lg:w-1/2 flex justify-center'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60'
            >
              <li className='border-b-2 my-2'>
                <div
                  className='flex flex-row gap-2 items-center tooltip'
                  data-tip={user?.displayName}
                >
                  <img src={user?.photoURL} className='w-12 rounded-full' />
                  <p> {user?.displayName}</p>
                </div>
              </li>

              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/blogs'>Blog Page</NavLink>
              </li>
              <li>
                <NavLink to='/alljobs'>All Jobs</NavLink>
              </li>
              <li>
                <NavLink to='/community'>Community </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to='/addjobs'>Add Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to='/myjobs'> My Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to='/appliedjobs'> Applied Jobs</NavLink>
                  </li>
                  <li>
                    <NavLink to='/ask'> Ask to Community </NavLink>
                  </li>
                </>
              )}

              <li>
                {user && user ? (
                  <button
                    className='btn btn-ghost btn-outline my-3 w-3/4 mx-auto'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink className='btn btn-ghost btn-outline ' to='/login'>
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
          <div className='flex items-center w-full'>
            <img className='w-20' src='/logo.png' alt='logo' />
            <Link className='font-bold normal-case text-3xl text-purple-900'>
              Job Hunter
            </Link>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/blogs'>Blog Page</NavLink>
            </li>
            <li>
              <NavLink to='/alljobs'>All Jobs</NavLink>
            </li>
            <li>
              <NavLink to='/community'>Community </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to='/addjobs'>Add Jobs</NavLink>
                </li>
                <li>
                  <NavLink to='/myjobs'> My Jobs</NavLink>
                </li>
                <li>
                  <NavLink to='/appliedjobs'> Applied Jobs</NavLink>
                </li>
                <li>
                  <NavLink to='/ask'> Ask to Community </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className='items-center navbar-end '>
          <div className='flex gap-4'>
            {user && (
              <div
                className='hidden lg:flex flex-row gap-4 items-center tooltip'
                data-tip={user?.displayName}
              >
                <img src={user?.photoURL} className='w-12 rounded-full' />
                <p>{user.displayName}</p>
              </div>
            )}
            <div className='hidden lg:flex'>
              {user ? (
                <button
                  className='btn btn-ghost btn-outline'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <NavLink className='btn btn-ghost btn-outline ' to='/login'>
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
