import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage";
import MaiNavigation from "./Component/MainNavigation";
import UserPage from "./page/User";
import RoomPage from "./page/Room";
import HotelPage from "./page/Hotels";
import TransactionPage from "./page/Transaction";
import NewHotelPage from "./page/NewHotel";
import NewRoomPage from "./page/NewRoom";
import Login from "./page/authen/Login";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <MaiNavigation />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/users", element: <UserPage /> },
        { path: "/hotels", element: <HotelPage /> },
        { path: "/transactions", element: <TransactionPage /> },
        { path: "/rooms", element: <RoomPage /> },
        { path: "/new-hotel", element: <NewHotelPage /> },
        { path: "/edit-hotel/:id", element: <NewHotelPage edit={true} /> },
        { path: "/new-room", element: <NewRoomPage /> },
        { path: "/edit-room/:id", element: <NewRoomPage edit={true} /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
