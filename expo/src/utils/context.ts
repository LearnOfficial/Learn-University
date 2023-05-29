import { useContext } from "react";
import { TokenContext } from "../storage/TokenContext";


export function useGraphQLContext() {
  const token = useContext(TokenContext);

  return {
    context: {
      headers: {
        Authorization: token
      }
    }
  };
}

