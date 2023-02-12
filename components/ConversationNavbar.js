import React, { useState } from "react";
import useScreenSize from "utils/screenSize";
import { GiHamburgerMenu } from "react-icons/gi";
import DirectMessages from "./DirectMessages";
import Hamburger from "hamburger-react";
const ConversationNavbar = (props) => {
  const screenSize = useScreenSize();

  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={`bg-zinc-700 border-b ${
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
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:block absolute  left-0 top-10 w-[20rem] h-[32rem] burgerbg  mt-2 transform transition-all duration-200 ease-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="">{props.children}</div>
          </div>
        </div>
      ) : null}

      {/* {screenSize.width === 0 || screenSize.width < 475 ? (
        <div className="relative">
        <button
          className="block lg:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              className="heroicon-ui"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
        <div
          className={`${
            open ? "block" : "hidden"
          } lg:block absolute top-0 right-0 bg-white w-64 mt-2`}
        >
          <div className="p-4">
            <p className="text-sm text-gray-600">Menu item 1</p>
            <p className="text-sm text-gray-600">Menu item 2</p>
            <p className="text-sm text-gray-600">Menu item 3</p>
          </div>
        </div> ) : null} */}

      {/* <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 100 80" width="15" height="15">
            <rect width="100" height="20" fill="#262626"></rect>
            <rect y="30" width="100" height="20" fill="#262626"></rect>
            <rect y="60" width="100" height="20" fill="#262626"></rect>
          </svg>
        </div> */}

      {/* </div> */}
      {/* ) : null  */}
      {/* <div>{open && props.children}</div> */}

      <div className="px-1 text-zinc-300">@ Luffy</div>
    </div>
  );
};

export default ConversationNavbar;
