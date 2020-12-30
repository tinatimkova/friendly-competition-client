import "./Navbar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useStateValue } from "../../providers/CurrentUserProvider";
import { useHistory } from "react-router-dom";
import { removeToken } from "../../services/auth";
import Button from "@material-ui/core/Button";
import logo from './logo.png';

function Navbar() {
  const [{ currentUser }, dispatch] = useStateValue();

  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/");
  };

  return (
    <>
      <nav className="navbar">
        <ul className="links">
          <li className="nav-block">
            <Link className='logo' to="/"><img style={{  width: '4rem', height: '3rem'}} src={logo}/></Link>
          </li>
          <li className="nav-block">
            <Link to="/">Create Contest</Link>
          </li>
          <li className="nav-block">
            <Link to="/">About</Link>
          </li>
        </ul>
        <div className="user-column">
          <Link className="profile-link" to={`/users/${currentUser?.id}`}>
            {!currentUser?.image ? (
              // <AccountCircleIcon className="icon" />
              ''
            ) : (
              <img
                className="user-image"
                src={currentUser?.image}
                alt={currentUser?.name}
              />
            )}
          </Link>
          <div className="name">{currentUser?.first_name}</div>
          <div className="auth-buttons">
            {currentUser && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
            {!currentUser && (
              <Button
                variant="contained"
                component={Link}
                to="/login"
              >
                Log In
              </Button>
            )}
            {!currentUser && (
              <Button
                variant="contained"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
