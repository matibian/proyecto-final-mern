import React from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);

  const handleSwitchComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      {showLogin ? (
        <LoginForm onSwitchComponent={handleSwitchComponent} set />
      ) : (
        <RegisterForm onSwitchComponent={handleSwitchComponent} />
      )}
    </>
  );
}
