import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
