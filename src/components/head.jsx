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
  const searchRef = useRef(null);

  /* ---------------- DEBOUNCE SEARCH ---------------- */
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
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery, searchCache]);

  /* ---------------- FETCH API ---------------- */
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
      console.error(err);
    }
  };

  /* ---------------- CLICK OUTSIDE ---------------- */
  useEffect(() => {
    const handleOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  /* ---------------- MENU ---------------- */
  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  /* ---------------- SELECT ---------------- */
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
          src="https://t3.ftcdn.net/jpg/01/09/45/80/360_F_109458015_QsWmchlzuwCZPqIUWR7HcTDsbbptejRv.jpg" />

        <Link to="/">
          <img
            className="w-20 sm:w-28 md:w-36 cursor-pointer"
            alt="logo"
            src="https://static.wixstatic.com/media/9d8ed5_010078f4ff064eaea416617bf062ac5e~mv2.jpg"
          />
        </Link>
      </div>

      {/* CENTER SEARCH */}
      <div
        ref={searchRef}
        className="relative col-span-7 sm:col-span-6 flex justify-center"
      >
        <div className="flex w-full max-w-xl">
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="rounded-l-full"
          />

          <Button variant="outline" className="rounded-r-full">
            <IoSearch />
          </Button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[96vw] max-w-[320px] sm:max-w-sm md:max-w-lg lg:max-w-xl bg-white shadow-xl rounded-xl z-50 border border-gray-200 max-h-[45vh] overflow-y-auto">
            <ul>
              {suggestions.map((s, i) => (
                <li
                  key={s + i}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                  onClick={() => handleSelect(s)}
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
