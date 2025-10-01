import { Moon, Sun } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { Switch } from "@headlessui/react";
import { useEffect } from "react";

function Settings() {
  const theme = useSelector((state) => state.theme.mode); // "light" or "dark"
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const enabled = theme === "dark";

  // Apply dark/light class to html
  useEffect(() => {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [enabled]);

  return (
    <div className="">
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-3xl font-semibold mb-1">Settings</h1>
        <p className="text-gray-500 text-sm md:text-md">
          Customize your FinanceTracker experience
        </p>
      </div>

      <div className="w-full flex justify-start items-center border border-gray-300 rounded-2xl p-4">
        <span className="flex justify-center items-center ml-4">
          Appearance
        </span>

        <div className="flex items-center gap-4 ml-auto">
          <Sun
            size={24}
            color={!enabled ? "#F59E0B" : "#9CA3AF"} // orange for light, dim for dark
            className="mr-2"
          />

          <Switch
            checked={enabled}
            onChange={handleToggle}
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${
              enabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span className="sr-only">Toggle appearance</span>
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
                enabled ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </Switch>

          <Moon
            size={24}
            color={enabled ? "#F8FAFC" : "#374151"} // bright on dark, dim on light
            className="mr-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
