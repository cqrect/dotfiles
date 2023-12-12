import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import Dialog from "./components/Dialog";
import { sendNotification } from "@tauri-apps/api/notification";
import { Transition } from "@headlessui/react";

export default function Index({
  setLogin,
}: {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [imageIds, setImageIds] = useState<Array<string>>(new Array());
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [preLoading, setPreLoading] = useState<boolean>(false);

  const showError = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setShowDialog(true);
  };

  const random = async () => {
    setLoading(true);
    invoke("random", { nsfw: false, count: 1 })
      .then((id) => {
        setImageIds([...imageIds, id as string]);
      })
      .catch((err) => showError("Random Error :(", err as string))
      .finally(() => {
        setLoading(false);
      });
  };

  const download = async () => {
    if (currentIndex < 0 || currentIndex > imageIds.length - 1) {
      return;
    }
    setDownloading(true);
    invoke("download", { id: imageIds[currentIndex] })
      .then((path) => {
        sendNotification({
          title: "NEKOS",
          body: `Save to ${path} success.`,
        });
      })
      .catch((err) => showError("Download Error :(", err as string))
      .finally(() => setDownloading(false));
  };

  const logout = async () => {
    invoke("logout");
  };

  const preview = () => {
    if (currentIndex - 1 > -1) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex + 1 < imageIds.length) setCurrentIndex(currentIndex + 1);
  };

  const preLoad = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => setPreLoading(false);
  };

  useEffect(() => {
    random();
  }, []);

  useEffect(() => {
    setPreLoading(true);
    setCurrentIndex(imageIds.length - 1);
    preLoad(`https://nekos.moe/image/${imageIds[imageIds.length - 1]}`);
  }, [imageIds]);

  return (
    <div className="absolute w-full h-full bg-stone-900 text-slate-50 font-sans flex flex-col justify-center items-center">
      <div className="w-full h-2/3 flex justify-center items-center relative">
        <button
          onClick={preview}
          className="absolute left-20 top-1/2 z-10 -translate-y-1/2 select-none outline-none bg-black/20 p-2 h-[calc(100%-6rem)] rounded-3xl hover:bg-black/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-20 top-1/2 z-10 -translate-y-1/2 select-none outline-none bg-black/20 p-2 h-[calc(100%-6rem)] rounded-3xl hover:bg-black/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div className="w-2/5 h-full p-24 relative after:content-[''] after:inset-0 after:absolute after:bg-gradient-to-r after:from-stone-900 after:via-stone-900 after:to-stone-900/50 after:via-40%">
          {currentIndex - 1 > -1 && (
            <div className="w-full h-full relative flex justify-center items-center">
              <img
                src={`https://nekos.moe/image/${imageIds[currentIndex - 1]}`}
                alt={`${imageIds[currentIndex - 1]}.jpeg`}
                className="object-contain h-48"
              />
            </div>
          )}
        </div>
        <div className="w-3/5 h-full flex justify-center items-center">
          {currentIndex > -1 && (
            <div className="w-full h-full flex justify-center items-center relative">
              <Transition
                show={!preLoading}
                enter="transition duration-300 ease-in"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex justify-center absolute h-full w-full p-6"
              >
                <img
                  src={`https://nekos.moe/image/${imageIds[currentIndex]}`}
                  alt={`${imageIds[currentIndex]}.jpeg`}
                  className="object-contain"
                ></img>
              </Transition>
              <Transition
                show={preLoading}
                enter="transition duration-300 ease-in"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4335 4335"
                  className="w-20 h-20 animate-spin fill-white relative"
                >
                  <path d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                </svg>
              </Transition>
            </div>
          )}
        </div>
        <div className="w-2/5 h-full p-24 relative after:content-[''] after:inset-0 after:absolute after:bg-gradient-to-l after:from-stone-900 after:via-stone-900 after:to-stone-900/50 after:via-40%">
          {currentIndex + 1 < imageIds.length && (
            <div className="w-full h-full relative flex justify-center items-center">
              <img
                src={`https://nekos.moe/image/${imageIds[currentIndex + 1]}`}
                alt={`${imageIds[currentIndex + 1]}.jpeg`}
                className="object-contain h-48"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-1/6 flex items-end justify-around">
        <div
          className={`relative group outline-none border-none hover:scale-105 transition duration-1000 hover:duration-300 select-none ${
            downloading ? "pointer-events-none scale-105" : ""
          }`}
        >
          <div className="-inset-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 blur absolute transition duration-1000 group-hover:duration-300 group-hover:from-pink-500 group-hover:to-purple-500"></div>
          <button
            onClick={download}
            disabled={downloading}
            className="flex items-center divide-x divide-gray-700 bg-stone-900 relative py-2 px-4 rounded-lg outline-none border-none"
          >
            <span className="pr-4 text-pink-500 transition duration-1000 group-hover:text-purple-500">
              I want it!
            </span>
            <span className="pl-4 text-purple-500 transition duration-1000 group-hover:text-pink-500">
              {downloading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4335 4335"
                  className="w-4 h-4 animate-spin fill-purple-500 transition duration-1000 group-hover:duration-300 group-hover:fill-pink-500"
                >
                  <path d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 fill-purple-500 transition duration-1000 group-hover:duration-300 group-hover:fill-pink-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
        <div
          className={`relative group outline-none border-none hover:scale-105 transition duration-1000 hover:duration-300 select-none ${
            loading ? "pointer-events-none scale-105" : ""
          }`}
        >
          <div className="-inset-0.5 absolute bg-gradient-to-tr from-pink-500 to-purple-500 blur rounded-lg opacity-75 group-hover:from-purple-500 group-hover:to-pink-500 outline-none transition group-hover:duration-300 duration-1000"></div>
          <button
            onClick={random}
            disabled={loading}
            className="divide-x rounded-lg flex items-center relative bg-stone-900 py-2 pl-4 divide-gray-700 border-none outline-none"
          >
            <span className="pr-4 text-purple-500 group-hover:text-pink-500 transition duration-1000 group-hover:duration-300">
              Give me a catgirl!
            </span>
            <span className="text-pink-500 transition duration-1000 group-hover:text-purple-500 group-hover:duration-300 w-20 text-center">
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4335 4335"
                  className="w-20 h-4 animate-spin fill-pink-500 transition duration-1000 group-hover:duration-300 group-hover:fill-purple-500"
                >
                  <path d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z" />
                </svg>
              ) : (
                "now →"
              )}
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-1/6 px-10 py-10 relative">
        <button
          onClick={() => {
            logout();
            setLogin(false);
          }}
          className="outline-none border-none text-sm text-stone-500 flex items-center absolute bottom-10 right-10 select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          back to login
        </button>
        <div className="absolute left-10 bottom-10 text-sm text-stone-700 select-none pointer-events-none">
          v0.1.0
        </div>
      </div>
      <Dialog
        title={dialogTitle}
        message={dialogMessage}
        show={showDialog}
        setShow={setShowDialog}
      />
    </div>
  );
}
