export default function LoginInput({
  type = "text",
  placeholder = "",
  className = "",
  value = "",
  errMessage = "",
  onChange = undefined,
  onClear = undefined,
}: {
  type?: "text" | "password";
  placeholder?: string;
  className?: string;
  value?: string;
  errMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClear?: () => void | undefined;
}) {
  let inputAttr = { err: errMessage };

  return (
    <div
      {...inputAttr}
      className={`${className} relative flex items-center w-[35rem] h-12 rounded-lg ${
        errMessage !== ""
          ? `after:content-[attr(err)] after:absolute after:right-2 after:-bottom-6 after:text-sm after:text-red-800 after:italic border-2 border-red-800`
          : ""
      }`}
    >
      <input
        value={value}
        required
        className="peer pl-4 bg-stone-900 w-full h-full border-none outline-none text-xl absolute rounded-lg z-10"
        type={type}
        onChange={onChange}
      />
      <label className="absolute pointer-events-none ml-2 rounded-lg text-xl text-gray-600 italic transition ease-linear duration-100 peer-focus:-translate-y-6 peer-focus:text-pink-500 peer-focus:text-base peer-focus:ml-3 peer-valid:-translate-y-6 peer-valid:text-pink-500 peer-valid:text-base peer-valid:ml-3 z-20 bg-stone-900 px-1">
        {placeholder}
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        onClick={onClear}
        className={`w-6 h-6 z-20 absolute right-4 text-gray-600 cursor-pointer stroke-2 opacity-30 ${
          value === "" ? "hidden" : ""
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 blur transition duration-100 opacity-50 peer-focus:from-purple-500 peer-focus:to-pink-500 peer-valid:from-purple-500 peer-valid:to-pink-500"></div>
    </div>
  );
}
