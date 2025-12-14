import React, { useEffect, useRef, useState } from "react";
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
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  const debounceRef = useRef(null);
  const blurTimeoutRef = useRef(null);

  /* ---------------- SEARCH WITH DEBOUNCE ---------------- */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        fetchSuggestions();
      }
    }, 250);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  /* ---------------- API CALL ---------------- */
  const fetchSuggestions = async () => {
    try {
      const res = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await res.json();
      setSuggestions(json[1]);

      dispatch(
        cacheResult({
          [searchQuery]: json[1],
        })
      );
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  };

  /* ---------------- MENU TOGGLE ---------------- */
  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  /* ---------------- SELECT SUGGESTION ---------------- */
  const handleSelect = (value) => {
    setSearchQuery(value);
    setShowSuggestions(false);
  };

  return (
    <div className="grid grid-cols-12 items-center w-full max-w-[1480px] mx-auto px-2 sm:px-4 gap-2 py-2">
      {/* LEFT */}
      <div className="col-span-3 flex items-center gap-2">
        <img
          onClick={handleMenuToggle}
          className="w-6 md:w-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAADPz89LS0uWlpb39/eCgoKQkJCxsbH29vZiYmI4ODh0dHTX19empqbFxcXr6+sQEBDh4eEbGxu7u7s0NDR6enpXV1egoKDJyclvb28ODg6IiIhcXFwfHx8ZGRnwNjATAAACZUlEQVR4nO3dCW7CMBCFYRdIw75vbSm9/y2rqKgUVRo72NJoxv93gveUkGBj7BAAAAAAAAAAAAAAAAAAoAKrdjq0Y9qu+tVbH1/sOa7TC7baYZ/UJvZrZtpJnzZrkgputHNm2KRUPGinzHKIF3zVzpjpNVZwq50w2zbScKodMNtULjjRzlfARGw41o5XwFhsONeOV8BcbGj3ZX83Extqpyui8oY77XQFXMWGJ+14BZzEhlbHTX/JY6iBdrwCFmJDD48auWBYaufLtow0NP803cUKhoV2xEyRT6H9+zR6j3bO2ikznFMKhrDSzvm05GnhxuYgap40l3izHlmbcpuNekx53y7kdmDHts/lAwAAAAAAAAAAxjRvy5Edy7e+P1zsh9q/JfU23PfoN7hqx33KdZBa0O5i9ugy9h+f2jkzfKYUfNdOmeU9XtD6Sm95lXfwsFhfXqofwkU7YLZLpKF2vgLkgnYXC93Jy4bsvgrv5JeivS9r/w3Fhh/a8QrYiA210xVR+TX0/zn0/yz1/z708KiRC1bwvdT+2CI6JeV+fFjBGL+CeRrLT5vEubYK5kuD/znvjvffLQAAAAAAAAAAgCHO94myt9fXoddeXxOj+7XFFkD/srtsKHHPPff7Jrrf+9L//qVf2hEzRfegtX2PdmL3qXa+AuSC/vfz9r8nu/999a3v5t2Rn6ba6YqovKH/c2ZsDpseyWcFWV/l3ZFXettfqh/9I7D7c9cqODvP/H+7EhazW5tke5RwhmVoLI+Bk84h9X+WbLA7hko9DzhUcKZzx/m53AAAAAAAAAAAAAAAAABg0zfn21Nf0tdOJAAAAABJRU5ErkJggg=="
        />

        <Link to="/">
          <img
            className="w-20 sm:w-28 md:w-36 cursor-pointer"
            alt="logo"
            src="https://static.wixstatic.com/media/9d8ed5_010078f4ff064eaea416617bf062ac5e~mv2.jpg"
          />
        </Link>
      </div>

      {/* CENTER SEARCH */}
      <div className="relative col-span-7 sm:col-span-6 flex justify-center">
        <div className="flex w-full max-w-xl">
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              blurTimeoutRef.current = setTimeout(() => {
                setShowSuggestions(false);
              }, 150);
            }}
            className="rounded-l-full"
          />

          <Button variant="outline" className="rounded-r-full">
            <IoSearch />
          </Button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div
            className="
              absolute top-full mt-2
              left-1/2 -translate-x-1/2
              w-[96vw] max-w-[320px]
              sm:max-w-sm md:max-w-lg lg:max-w-xl
              bg-white shadow-xl rounded-xl z-50
              border border-gray-200
              max-h-[45vh] overflow-y-auto
            "
          >
            <ul>
              {suggestions.map((s, i) => (
                <li
                  key={s + i}
                  className="
                    flex items-center gap-3
                    px-4 py-3 text-sm
                    cursor-pointer
                    hover:bg-gray-100
                    active:bg-gray-200
                  "
                  onMouseDown={() => handleSelect(s)}
                  onTouchStart={() => handleSelect(s)}
                >
                  <IoSearch size={14} className="text-gray-500" />
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="col-span-2 sm:col-span-3 flex justify-end">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Head;
