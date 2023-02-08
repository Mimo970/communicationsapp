import React from "react";

const DMSNavbar = () => {
  return (
    <div>
      <div class="relative">
        <input
          type="search"
          class="bg-neutral-900 rounded text-white w-64 p-2 pl-10 focus:outline-none focus:shadow-outline"
          placeholder="Find or start a conversation"
        />
        <span class="absolute left-0 top-0 bottom-0 flex items-center pl-3">
          <svg
            class="h-4 w-4 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default DMSNavbar;
