import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {!isLoggedIn && <Route path="/auth" element={<AuthPage />}></Route>}
        {isLoggedIn && (
          <Route path="/profile" element={<UserProfile />}></Route>
        )}

        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
