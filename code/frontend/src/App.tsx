import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalCss } from "./styles/styles"

import LoginForm from './pages/login/loginForm';
import EmailForm from './pages/login/emailForm';
import ResetPassForm from './pages/login/resetPassForm';
import Import from "./pages/import";
import Support from "./pages/support";

function App() {
  return (
    <>
      <GlobalCss />
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/forgot-password" element={<EmailForm />} />
            <Route path="/reset-password/:uid/:token/" element={<ResetPassForm />} />
            <Route path="/import" element={<Import />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;