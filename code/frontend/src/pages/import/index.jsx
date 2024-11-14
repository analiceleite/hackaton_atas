import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImportContainer from "../../containers/import/import";

export const ImportPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user_token')) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container">
      <ImportContainer />
    </div>
  );
};

export default ImportPage;
