import { useState, useRef } from "react";
import Main from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlbumsEdit from "./pages/AlbumsEdit";
import AlbumsPreview from "./pages/AlbumsPreview";
import Albums, { action as albumsAction } from "./pages/Albums";
import Side from "./components/layouts/side";
import Aside from "./components/aside";
import Container from "./components/layouts/container";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  Outlet,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <Container>
        <Side>
          <Aside />
        </Side>
        <Outlet />
      </Container>
    ),
    children: [
      {
        path: "albums",
        element: <Albums />,
        action: albumsAction,
      },
      {
        path: "albums/:albumId/edit",
        element: <AlbumsEdit />,
      },
      {
        path: "albums/:albumId",
        element: <AlbumsPreview />
      },
      {
        path: "/",
        element: <Main />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
