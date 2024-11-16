import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Root from "./routes/root";
import ErrorPage from "./routes/error_page";
import LoginPage from "./routes/login";
import {DiscoverComPage, FeedPage} from "./routes/dash";
import {ProfilePage} from "./routes/dash";
import {CommunityPage} from "./routes/dash";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "login",
        element: <LoginPage/>
    },
    {
        path: "dash",
        element: null,
        children: [
            {
                path: "feed",
                element: <FeedPage/>
            },
            {
                path: "community/:communityId",
                element: <CommunityPage/>
            },
            {
                path: "profile/:userId",
                element: <ProfilePage/>
            },
            {
                path: "discover",
                element: <DiscoverComPage/>
            }
        ]
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
