import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Context provider children
interface PropsToContextProvider {
  children: ReactNode;
}

// Keys needed in global context
type GlobalData = {
  profile: null;
};

// Setters for keys in global context
interface CreateContextProps extends GlobalData {
  setProfile?: Dispatch<SetStateAction<null>>;
}

export const GlobalContext = createContext<CreateContextProps>({
  profile: null,
});

const GlobalContextProvider = (props: PropsToContextProvider) => {
  const [profile, setProfile] = useState<null>(null);

  const val: CreateContextProps = {
    profile,
    setProfile,
  };
  return (
    <GlobalContext.Provider value={val}>
      {" "}
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
