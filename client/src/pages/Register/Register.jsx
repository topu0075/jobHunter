import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../components/Loading/Loading";
import titleUpdate from "../../utils/titleController";

const Register = () => {
  titleUpdate("Job Hunter | Register");
  const { createUser, profileUpdate, loading, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    const url = form.url.value;
    const username = form.name.value;
    const validPass = new RegExp(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/);
    const validation = validPass.test(pass);

    if (validation) {
      try {
        const res = await createUser(email, pass);
        console.log(res);

        await profileUpdate(username, url);

        //console.log(res);
        Swal.fire({
          title: "Success!",
          text: "Registration Successful",
          icon: "success",
          confirmButtonText: "Proceed",
        });
        setLoading(false);
        navigate(0, "/");
      } catch (error) {
        form.reset();
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "try again",
        });
        setLoading(false);
      }
    } else {
      form.reset();
      Swal.fire({
        title: "Error!",
        text: "Password must be grater than 6 characters and must contain a capital letter and special character",
        icon: "error",
        confirmButtonText: "try again",
      });
      setLoading(false);
    }
  };

  return (
    <div className='md:w-1/2 mx-auto py-10 hero bg-purple-50 rounded-lg mb-20 text-black'>
      <div className='hero-content flex-col'>
        {loading ? (
          <Loading></Loading>
        ) : (
          <>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl font-bold my-5'>Register now!</h1>
            </div>
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <form className='card-body' onSubmit={handleCreateUser}>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Name</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='Name'
                    className='input input-bordered'
                    name='name'
                    required
                  />
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='Email'
                    className='input input-bordered'
                    name='email'
                    required
                  />
                  <label className='label'>
                    <span className='label-text'>Photo URL</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Photo URL'
                    className='input input-bordered'
                    name='url'
                    required
                  />
                  <div
                    className='form-control tooltip'
                    data-tip='password must be grater than 6 characters and contain a capital letter and special character'
                  >
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input
                      type='password'
                      placeholder='Password'
                      className='input input-bordered'
                      name='password'
                      required
                    />
                  </div>
                </div>

                <div className='flex flex-col'>
                  <label className='label'>
                    <p className='text-xs'>Already a member?</p>
                    <Link
                      to='/login'
                      className='label-text-alt link link-hover'
                    >
                      Login Here
                    </Link>
                  </label>
                </div>
                <div className='form-control mt-2'>
                  <button className='btn btn-primary text-white'>
                    Register
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

export default Register;
