import { HelmetProvider, Helmet } from "react-helmet-async";
import PokemonTable from "./components/PokemonTable";
import './App.css'

function App() {

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Pokédex | Lista de Pokémon</title>
           <meta name="description" content="Explora la lista de Pokémon con imágenes y búsqueda interactiva." />
          <meta name="keywords" content="Pokémon, Pokédex, API, React, TypeScript" />
          <meta property="og:title" content="Pokédex | Lista de Pokémon" />
          <meta property="og:description" content="Explora y filtra tu Pokémon favorito en esta Pokédex interactiva." />
        </Helmet>
        <PokemonTable />
      </HelmetProvider>
    </>
  )
}

export default App
