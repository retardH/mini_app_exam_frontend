import "./App.scss"; // Import the CSS file for additional styles
import Information from "./components/Information";
import Typography from "./components/Typography";

function App() {
  return (
    <div className="welcome-container">
      <div className="overlay">
        <div className="content">
          <Typography
            textAlign="center"
            fontWeight="bold"
            fontSize="30px"
            color="#fff"
          >
            Welcome to Template
          </Typography>
          <Typography textAlign="center" fontSize="14px" color="#fff">
            Your journey starts here. Explore and enjoy!
          </Typography>
        </div>
        <Information />
      </div>
    </div>
  );
}

export default App;
