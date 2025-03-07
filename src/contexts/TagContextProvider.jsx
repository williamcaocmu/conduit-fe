import { createContext, useState } from "react";

export const TagContext = createContext();

const TagContextProvider = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState("");

  return (
    <TagContext.Provider value={{ selectedTag, setSelectedTag }}>
      {children}
    </TagContext.Provider>
  );
};

export default TagContextProvider;
