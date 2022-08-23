import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const navigate = useNavigate();

  const navigateLoginHandle = (res) => {
    if (res.access_token) {
      localStorage.setItem("SignInJWT", res.access_token);
      navigate("/todo");
    }
  };

  const alertHandle = (res) => {
    if (res.message) {
      alert(res.message);
    } else return;
  };

  const requestHandle = (res) => {
    alertHandle(res);
    navigateLoginHandle(res);
  };

  const signInButtonHandle = () => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${userID}`,
          password: `${userPW}`,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => requestHandle(res));
  };
  return (
    <LoginContainer>
      {!localStorage.getItem("SignUpJWT") && (
        <Navigate to="/signup" replace={true} />
      )}
      {localStorage.getItem("SignInJWT") && (
        <Navigate to="/todo" replace={true} />
      )}
      <LoginContent>
        <LoginText>Login</LoginText>
        <LoginInput
          onChange={(e) => setUserID(e.target.value)}
          type="text"
        ></LoginInput>
        <PassWordInput
          onChange={(e) => setUserPW(e.target.value)}
          type="password"
        ></PassWordInput>
        <LoginButton
          disabled={userID.includes("@") && userPW.length >= 8 ? false : true}
          onClick={() => signInButtonHandle()}
        >
          SignUpButton
        </LoginButton>
      </LoginContent>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LoginContent = styled.div`
  border: 2px solid blue;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  min-width: 600px;
  height: 50%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginText = styled.div`
  width: 40%;
  height: 7%;
  font-size: 33px;
`;

const LoginInput = styled.input`
  width: 40%;
  height: 7%;
  margin: 2%;
`;
const PassWordInput = styled.input`
  width: 40%;
  height: 7%;
  margin: 2%;
`;
const LoginButton = styled.button`
  background-color: #62b2f2;
  width: 20%;
  height: 7%;
`;

export default Login;
