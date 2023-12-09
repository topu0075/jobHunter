import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../components/Loading/Loading";
import titleUpdate from "../../utils/titleController";

const Login = () => {
  titleUpdate("Job Hunter | Login");
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, googleLogin, loading, setLoading } =
    useContext(AuthContext);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    try {
      const res = await signInUser(email, pass);
      //console.log(res);
      Swal.fire({
        title: "Success!",
        text: "Sign in successfully",
        icon: "success",
        confirmButtonText: "Proceed",
      });
      setLoading(false);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      //console.log(error);
      setLoading(false);
      form.reset();
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      //console.log(res);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      //console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: { error },
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return (
    <div className='md:w-1/2 mx-auto py-16 hero bg-purple-50 rounded-lg mb-20 text-black'>
      <div className='hero-content flex-col'>
        {loading ? (
          <Loading></Loading>
        ) : (
          <>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl font-bold my-5'>Login now!</h1>
            </div>
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <form className='card-body' onSubmit={handleUserLogin}>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='email'
                    className='input input-bordered'
                    name='email'
                    required
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    placeholder='password'
                    className='input input-bordered'
                    name='password'
                    required
                  />
                  <div className='flex flex-col justify-between'>
                    <label className='label'>
                      <p className='text-xs'>Not a member yet ?</p>
                      <Link
                        to='/register'
                        className='label-text-alt link link-hover'
                      >
                        Register Here
                      </Link>
                    </label>
                  </div>
                </div>
                <div className='form-control my-2 flex flex-col gap-4'>
                  <button
                    type='submit'
                    name='login'
                    className='btn btn-outline btn-accent font-bold'
                  >
                    Login
                  </button>
                  <button
                    className='w-full btn btn-outline btn-secondary font-bold'
                    onClick={handleGoogleLogin}
                  >
                    <FaGoogle />
                    Login with Google
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
