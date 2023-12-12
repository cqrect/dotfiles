import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Login from "./Login.tsx";
import { invoke } from "@tauri-apps/api";
import { exit } from "@tauri-apps/api/process";
import Index from "./Index.tsx";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasToken, setHasToken] = useState<boolean>(false);

  const setupApplication = async () => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }

    if (!permissionGranted) {
      await exit(1);
    }

    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    appWindow.show();
  };

  useEffect(() => {
    setupApplication();
    setLoading(true);
    invoke("check_token").then((res) => {
      if (res as boolean) {
        setHasToken(true);
      } else {
        setHasToken(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4335 4335"
            className="w-16 h-16 fill-white animate-spin"
          >
            <path d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
          </svg>
        </div>
      </Transition>
      <Transition
        show={!loading && hasToken}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Index setLogin={setHasToken} />
      </Transition>
      <Transition
        show={!loading && !hasToken}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Login setLogin={setHasToken} />
      </Transition>
    </div>
  );
}
