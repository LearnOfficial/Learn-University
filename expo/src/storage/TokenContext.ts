import { createContext, Dispatch, SetStateAction } from "react";

const TokenContext = createContext<string | null | undefined>(null);
const SetTokenContext = createContext<Dispatch<SetStateAction<string |  null | undefined >> | null | undefined>(null);

export {TokenContext, SetTokenContext}
