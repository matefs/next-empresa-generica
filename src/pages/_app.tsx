import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import AppContext from "../../ContextoDaAplicacao";

export default function App({ Component, pageProps }: AppProps) {
  const [meuNome, setMeuNome] = useState("MATEUS");
  const [bearerToken, setBearerToken] = useState("");

  return (
    <AppContext.Provider
      value={{
        state: {
          nome: meuNome,
          bearerToken: bearerToken,
        },
        setMeuNome: setMeuNome,
        setBearerToken: setBearerToken,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
