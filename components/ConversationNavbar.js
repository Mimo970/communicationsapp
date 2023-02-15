import React, { useContext, useState } from "react";
import useScreenSize from "utils/screenSize";
import { GiHamburgerMenu } from "react-icons/gi";
import DirectMessages from "./DirectMessages";
import Hamburger from "hamburger-react";
import { ChatContext } from "contexts/ChatContext";
const ConversationNavbar = (props) => {
  const screenSize = useScreenSize();

  const [isOpen, setOpen] = useState(false);
  const { data } = useContext(ChatContext);
  return (
    <div
      className={`bg-zinc-700 border-b p-3.5 ${
        screenSize.width > 475 && "p-3.5"
      }  border-b-zinc-800 items-center flex ${
        isOpen === false && "items-center"
      } `}
    >
      {screenSize.width === 0 || screenSize.width < 475 ? (
        <div className="relative">
          {/* <button
            className="block lg:hidden focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                className="heroicon-ui"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button> */}
          {screenSize.width > 475 && (
            <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
          )}

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:block absolute  left-0 top-10 w-[20rem] h-[32rem] burgerbg  mt-2 transform transition-all duration-200 ease-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {screenSize.width > 475 && <div className="">{props.children}</div>}
          </div>
        </div>
      ) : null}

      <div className="px-1 text-zinc-300">@ {data.user.displayName}</div>
    </div>
  );
};

export default ConversationNavbar;
