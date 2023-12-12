import { Dialog as DialogUI } from "@headlessui/react";

export default function Dialog({
  title,
  message,
  show,
  setShow,
}: {
  title: string;
  message: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DialogUI
      open={show}
      onClose={() => setShow(false)}
      className="relative z-40"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogUI.Panel className="relative w-1/2 p-8 text-white bg-black/95 rounded-xl before:content-[''] before:-inset-0.5 before:bg-gradient-to-tl before:from-pink-500 before:to-purple-500 before:absolute before:rounded-xl before:blur before:-z-10">
            <DialogUI.Title className="font-bold text-2xl mb-4 select-none">
              {title}
            </DialogUI.Title>
            <DialogUI.Description className="font-normal text-base mb-6 underline decoration-red-500 decoration-2 underline-offset-4">
              {message}
            </DialogUI.Description>
            <div className="w-full text-right">
              <button
                onClick={() => setShow(false)}
                className="outline-none rounded-lg bg-white text-black p-2 text-xs hover:scale-105 active:scale-100 select-none"
              >
                ok, I know
              </button>
            </div>
          </DialogUI.Panel>
        </div>
      </div>
    </DialogUI>
  );
}
