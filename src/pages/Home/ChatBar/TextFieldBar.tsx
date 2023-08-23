import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function TextFieldBar() {
  return (
    <div className="flex h-[90px] w-full shrink-0 p-4">
      <input
        className="mr-4 grow bg-[#333333] p-4 focus:outline-0"
        placeholder="Type your message..."
      />
      <button>
        <FontAwesomeIcon
          className="flex items-center justify-center rounded-md bg-red-500 bg-opacity-20 p-5 text-white transition-all ease-out hover:bg-opacity-100"
          icon={solid("paper-plane")}
        />
      </button>
    </div>
  );
}
