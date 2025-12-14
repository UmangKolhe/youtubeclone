import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "@/utils/aapSlice";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "@/utils/constants";
import { cacheResult } from "@/utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const searchCache = useSelector((store) => store.search);
  const dispatch =useDispatch()

  useEffect(() => {
    //api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSugestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSugestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json[1]);
    setSuggestions(json[1]);
    dispatch(cacheResult({
      [searchQuery]:json[1]
    }))
  };

  // const dispatch = useDispatch();

  function toggleMenufun() {
    dispatch(toggleMenu());
  }

  return (
    <div className="  grid grid-cols-12 items-center w-full max-w-[1480px] mx-auto px-2 sm:px-4 gap-2 py-2">
      {/* LEFT */}
      <div className="col-span-3 flex items-center justify-start space-x-2">
        <img
          onClick={() => {
            toggleMenufun();
          }}
          className="w-5 sm:w-6 md:w-8 lg:w-10 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAADPz89LS0uWlpb39/eCgoKQkJCxsbH29vZiYmI4ODh0dHTX19empqbFxcXr6+sQEBDh4eEbGxu7u7s0NDR6enpXV1egoKDJyclvb28ODg6IiIhcXFwfHx8ZGRnwNjATAAACZUlEQVR4nO3dCW7CMBCFYRdIw75vbSm9/y2rqKgUVRo72NJoxv93gveUkGBj7BAAAAAAAAAAAAAAAAAAoAKrdjq0Y9qu+tVbH1/sOa7TC7baYZ/UJvZrZtpJnzZrkgputHNm2KRUPGinzHKIF3zVzpjpNVZwq50w2zbScKodMNtULjjRzlfARGw41o5XwFhsONeOV8BcbGj3ZX83Extqpyui8oY77XQFXMWGJ+14BZzEhlbHTX/JY6iBdrwCFmJDD48auWBYaufLtow0NP803cUKhoV2xEyRT6H9+zR6j3bO2ikznFMKhrDSzvm05GnhxuYgap40l3izHlmbcpuNekx53y7kdmDHts/lAwAAAAAAAAAAxjRvy5Edy7e+P1zsh9q/JfU23PfoN7hqx33KdZBa0O5i9ugy9h+f2jkzfKYUfNdOmeU9XtD6Sm95lXfwsFhfXqofwkU7YLZLpKF2vgLkgnYXC93Jy4bsvgrv5JeivS9r/w3Fhh/a8QrYiA210xVR+TX0/zn0/yz1/z708KiRC1bwvdT+2CI6JeV+fFjBGL+CeRrLT5vEubYK5kuD/znvjvffLQAAAAAAAAAAgCHO94myt9fXoddeXxOj+7XFFkD/srtsKHHPPff7Jrrf+9L//qVf2hEzRfegtX2PdmL3qXa+AuSC/vfz9r8nu/999a3v5t2Rn6ba6YqovKH/c2ZsDpseyWcFWV/l3ZFXettfqh/9I7D7c9cqODvP/H+7EhazW5tke5RwhmVoLI+Bk84h9X+WbLA7hko9DzhUcKZzx/m53AAAAAAAAAAAAAAAAABg0zfn21Nf0tdOJAAAAABJRU5ErkJggg=="
        />
        <Link to="/">
          <img
            className="w-14 sm:w-24 md:w-32 lg:w-40 cursor-pointer"
            alt="logo"
            src="https://static.wixstatic.com/media/9d8ed5_010078f4ff064eaea416617bf062ac5e~mv2.jpg"
          />
        </Link>
      </div>

      {/* CENTER SEARCH BAR */}
      <div className=" relative col-span-7 sm:col-span-6 flex items-center justify-center">
        <div
          className="flex items-center w-full 
                  max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl 
                  gap-2"
        >
          {/* INPUT */}
          <Input
            className="
        rounded-l-full w-full
        text-xs sm:text-sm md:text-base
        py-2 sm:py-3 md:py-3
        px-3 sm:px-4 md:px-5
      "
            onFocus={() => {
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setShowSuggestions(false);
            }}
            onMouseDown={() => {
  setShowSuggestions(true);
}}
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          {/* BUTTON */}
          <Button
            className="
            bg-gray-100
        rounded-r-full cursor-pointer
        py-2 sm:py-3 md:py-3
        px-3 sm:px-4 md:px-5
      "
            variant="outline"
          >
            <IoSearch className=" sm:size-4 md:size-6" />
          </Button>
        </div>
        {searchQuery !== "" && showSuggestions && (
          <div className=" mt-2 py-2 px-5  absolute top-full left-0 w-full max-w-[600px] h-[520px] bg-white z-50 shadow-lg rounded-xl">
            <ul>
              {suggestions.map((obj,index) => (
                <li key={obj + index} className="flex items-center hover:bg-gray-100 p-2 gap-3 text-2xl">
                  <IoSearch className=" sm:size-3 md:size-5" /> {obj}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="col-span-2 sm:col-span-3 flex justify-end">
        <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
          <AvatarImage
            className="cursor-pointer "
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        
      </div>
    </div>
  );
};

export default Head;
