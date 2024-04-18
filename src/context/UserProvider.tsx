import i18next from "i18next";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { ModePlay } from "src/components/SelectMode";
import { LANGUAGES, Language } from "src/models/Language";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const UserContext = createContext<{
  language: Language;
  languages: Array<Language>;
  setLanguage: (language: Language) => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  playMode: string;
  setPlayMode: (mode: string) => void;
}>({
  language:
    localStorage.getItem("language") !== null
      ? (JSON.parse(localStorage.getItem("language")!) as Language)
      : LANGUAGES[0],
  languages: [],
  setLanguage: (language: Language) => {},
  mode: "light",
  setMode: (mode: "light" | "dark") => {},
  playMode: "winstay",
  setPlayMode: (mode: string) => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [playMode, setPlayMode] = useState(
    localStorage.getItem("playMode") !== null
      ? (localStorage.getItem("playMode")! as string)
      : "winstay"
  );

  useEffect(() => {
    if (playMode) {
      localStorage.setItem("playMode", playMode);
    }
  }, [playMode]);

  const getDefaultLanguage = () => {
    let result: undefined | Language = undefined;
    if (navigator.languages.length > 0) {
      const languageBrower = navigator.languages[0].split(/-|_/)[0];

      result = LANGUAGES.find((el) => el.browser === languageBrower);
    }
    return result ?? LANGUAGES[0];
  };
  const getLanguage = () =>
    localStorage.getItem("language") !== null
      ? (JSON.parse(localStorage.getItem("language")!) as Language)
      : getDefaultLanguage();

  const [mode, setMode] = useState<"light" | "dark">(
    localStorage.getItem("mode") !== null
      ? (localStorage.getItem("mode")! as "light" | "dark")
      : "dark"
  );

  const [language, setLanguage] = useState<Language>(getLanguage());

  useEffect(() => {
    if (language) {
      moment.locale(language.iso);
      changeLanguage(language.iso);
      localStorage.setItem("language", JSON.stringify(language));
    }
  }, [language]);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("mode", mode);
    } else {
      localStorage.removeItem("mode");
    }
  }, [mode]);

  const changeLanguage = async (language: string) => {
    await i18next.changeLanguage(language);
  };

  return (
    <UserContext.Provider
      value={{
        languages: LANGUAGES,
        language,
        setLanguage,
        setMode,
        mode,
        playMode,
        setPlayMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
