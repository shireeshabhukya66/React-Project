import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = ["light", "dark", "blue", "green"];

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="theme-wrapper" ref={dropdownRef}>
      <button className="theme-btn" onClick={() => setOpen(!open)}>
        Theme: {theme}
      </button>

      {open && (
        <div className="theme-dropdown">
          {themes.map((t) => (
            <div
              key={t}
              className="theme-option"
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}