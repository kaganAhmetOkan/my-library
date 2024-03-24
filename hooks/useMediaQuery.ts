import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

export function useColorScheme() {
  const isLight = useMediaQuery("(prefers-color-scheme: light)");

  return { isLight, isDark: !isLight };
};