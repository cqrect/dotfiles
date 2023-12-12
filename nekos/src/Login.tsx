import React, { useState } from "react";
import LoginInput from "./components/LoginInput.tsx";
import { invoke } from "@tauri-apps/api";
import Dialog from "./components/Dialog.tsx";

export default function Login({
  setLogin,
}: {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameErr, setUsernameErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");

  // 用户名输入改变
  const usernameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  // 密码输入改变
  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  // 清除用户名输入
  const usernameClearHandler = () => setUsername("");

  // 清除密码输入
  const passwordClearHandler = () => setPassword("");

  // 绑定回车键
  const enterPress = (e: React.KeyboardEvent<HTMLDivElement>) =>
    e.key === "Enter" && login();

  // 登陆
  const login = () => {
    let valid = true;
    if (!checkUsername()) valid = false;
    if (!checkPassword()) valid = false;
    if (!valid) return;
    setIsLogin(true);
    invoke("auth", { username: username, password: password })
      .then(() => setLogin(true))
      .catch((err) => {
        setDialogMessage(err);
        setOpenDialog(true);
      })
      .finally(() => setIsLogin(false));
  };

  const checkUsername = (): boolean => {
    if (username === "") {
      setUsernameErr("Please input your username here.");
      return false;
    }
    setUsernameErr("");
    return true;
  };

  const checkPassword = (): boolean => {
    if (password === "") {
      setPasswordErr("Please input your password here.");
      return false;
    }
    setPasswordErr("");
    return true;
  };

  return (
    <div className="absolute w-full h-full bg-stone-900 text-slate-50 font-sans flex flex-col justify-center items-center box-border select-none">
      <div className="w-full h-1/3 flex items-end justify-center">
        <h1 className="font-black tracking-widest text-[5rem] italic bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-title mb-20">
          NEKOS
        </h1>
      </div>
      <div
        className="w-full h-1/2 flex flex-col justify-center items-center"
        onKeyDown={enterPress}
      >
        <div className="relative flex flex-col justify-center items-center space-y-14 pt-4">
          <LoginInput
            errMessage={usernameErr}
            type="text"
            placeholder="username"
            value={username}
            onChange={usernameChangeHandler}
            onClear={usernameClearHandler}
          />
          <LoginInput
            errMessage={passwordErr}
            type="password"
            placeholder="password"
            value={password}
            onChange={passwordChangeHandler}
            onClear={passwordClearHandler}
          />
        </div>
        <div className="flex-1 flex justify-center items-start">
          <button
            disabled={isLogin}
            onClick={login}
            className="group rounded-lg p-2 w-72 h-12 mt-20 bg-gradient-to-tl from-purple-500 to-pink-500 hover:scale-105 transition duration-100 ease-in-out outline-none shadow-md disabled:pointer-events-none disabled:from-purple-500/75 disabled:to-pink-500/75 disabled:scale-105"
          >
            <span className="font-black tracking-wider inline-block transition group-disabled:animate-spin">
              {isLogin ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4335 4335"
                  className="w-6 h-6"
                >
                  <path
                    fill="#FFFFFF"
                    d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
                  />
                </svg>
              ) : (
                "LOGIN"
              )}
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-1/6 flex justify-center items-end pb-20 text-gray-500 opacity-30">
        nekos desktop &copy; cqrect 2023-present
      </div>
      <Dialog
        show={openDialog}
        setShow={setOpenDialog}
        title="Login Error :("
        message={dialogMessage}
      />
    </div>
  );
}
