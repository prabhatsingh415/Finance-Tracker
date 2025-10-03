import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeLoader() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
      document.body.style.backgroundColor = "#000000";
    } else {
      html.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
    }
  }, [theme]);

  return null;
}

export default ThemeLoader;
