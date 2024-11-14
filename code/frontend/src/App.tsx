import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalCss } from "./styles/styles"
import LoginForm from './pages/login/loginForm';
import Import from "./pages/import";

function App() {
  return (
    <>
      <GlobalCss />
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/import" element={<Import />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;