import { Outlet, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const MaiNavigation = () => {
  return (
    <div className={classes.adContainer}>
      <h1>Adimin page</h1>
      <hr />
      <div className={classes.container}>
        <nav>
          <span>
            <h1>Main</h1>
            <ul>
              <li>
                <Link to="/">
                  <i className="fa-solid fa-gauge"></i> Dashboard
                </Link>
              </li>
            </ul>
          </span>
          <span>
            <h1>List</h1>
            <ul>
              <li>
                <Link to="/users">
                  <i className="fa-solid fa-user"></i> User
                </Link>
              </li>
              <li>
                <Link to="/hotels">
                  <i className="fa-solid fa-hotel"></i> Hotel
                </Link>
              </li>
              <li>
                <Link to="/rooms">
                  <i className="fa-solid fa-people-roof"></i> Rooms
                </Link>
              </li>
              <li>
                <Link to="/transactions">
                  <i className="fa-solid fa-truck-fast"></i> Transaction
                </Link>
              </li>
            </ul>
          </span>
          <span>
            <h1>New</h1>
            <ul>
              <li>
                <Link to="/new-hotel">
                  <i className="fa-solid fa-hotel"></i> New Hotel
                </Link>
              </li>
              <li>
                <Link to="/new-room">
                  <i className="fa-solid fa-people-roof"></i> New Rooms
                </Link>
              </li>
            </ul>
          </span>
          <span>
            <h1>User</h1>
            <ul>
              <li>
                <Link to="/login">
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </Link>
              </li>
            </ul>
          </span>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
export default MaiNavigation;
