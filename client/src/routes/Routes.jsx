import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/RootLayout";

import axios from "axios";
import AddJobs from "../pages/AddJob/AddJobs";
import AllJobs from "../pages/AllJob/AllJobs";
import AppliedJobs from "../pages/AppliedJobs/AppliedJobs";
import Blog from "../pages/Blog/Blogs";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import ErrorPg from "../pages/Error/ErrorPg";
import Home from "../pages/Home/Home";
import JobDetails from "../pages/JobDetails/JobDetails";
import Login from "../pages/Login/Login";
import MyJobs from "../pages/MyJobs/MyJobs";
import Register from "../pages/Register/Register";
import UpdateJob from "../pages/UpdateJob/UpdateJob";
import PrivateRoutes from "./PrivateRoutes";

// //console.log(process.env.REACT_APP_URL);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPg />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          return fetch(`${process.env.REACT_APP_URL}/allJobs`);
        },
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/alljobs",
        element: <AllJobs></AllJobs>,
        loader: async () => {
          return fetch(`${process.env.REACT_APP_URL}/allJobs`);
        },
      },
      {
        path: "/blogs",
        element: <Blog></Blog>,
        loader: async () =>
          await axios.get(`${process.env.REACT_APP_URL}/blogs`),
      },
      {
        path: "/blogdetails/:id",
        element: <BlogDetails></BlogDetails>,
        loader: async ({ params }) =>
          await axios.get(`${process.env.REACT_APP_URL}/blogs/${params.id}`),
      },
      {
        path: "/myjobs",
        element: (
          <PrivateRoutes>
            <MyJobs></MyJobs>
          </PrivateRoutes>
        ),
      },
      {
        path: "/appliedjobs",
        element: (
          <PrivateRoutes>
            <AppliedJobs></AppliedJobs>
          </PrivateRoutes>
        ),
      },

      {
        path: "/addjobs",
        element: (
          <PrivateRoutes>
            <AddJobs></AddJobs>
          </PrivateRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <PrivateRoutes>
            <JobDetails></JobDetails>,
          </PrivateRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoutes>
            <UpdateJob />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
