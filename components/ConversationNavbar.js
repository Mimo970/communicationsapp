import React, { useContext, useState } from "react";
import useScreenSize from "utils/screenSize";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAtOutline } from "react-icons/io5";
import DirectMessages from "./DirectMessages";
import Hamburger from "hamburger-react";
import { ChatContext } from "contexts/ChatContext";
import Input from "./Input";
const ConversationNavbar = (props) => {
  const screenSize = useScreenSize();

  const [isOpen, setOpen] = useState(false);
  const { data } = useContext(ChatContext);
  return (
    <div
      className={`primary-lighter border-b p-3.5 ${
        screenSize.width > 475 && "p-3.5"
      }  border-b-zinc-800 items-center flex ${
        isOpen === false && "items-center"
      } `}
    >
      {screenSize.width === 0 || screenSize.width < 475 ? (
        <div className="relative">
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

      <div className="px-1  text-zinc-300">
        {data.chatId === "null" ? (
          <div className="py-3">
            {/* <input
              // onKeyDown={handleKey}
              // onChange={(e) => setUsername(e.target.value)}
              type="search"
              name=""
              id=""
              className="w-96 text-white"
              placeholder="Search"
            /> */}
          </div>
        ) : (
          <div className="flex items-center">
            <IoAtOutline size={24} /> &nbsp;{data.user.displayName}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationNavbar;
