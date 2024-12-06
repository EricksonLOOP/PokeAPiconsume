import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/nav";
import axios from "axios";
import { PokemonDetails, Result } from "../../interfaces/pokemon";
import LoadingScreen from "../../global-components/loading-screen";
import PokeBola from "../../imgs/pokebola.webp";
import { motion } from "framer-motion";
import ScreenPokemon from "./components/show-pokemon-screen";
import selectsound from "../../global-components/select-audio.mp3"
import ErrorAlertScreen from "./components/error-alert-screen";
export default function Index() {
    const [results, setResults] = useState<Result[]>([]);
    const [resultSprites, setResultSprites] = useState<string[]>([]);
    const [resultMainColor, setResultMainColor] = useState<string[]>([]);
    const [resultDetails, setResultDetails] = useState<PokemonDetails[]>([]);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [isLoading, setIsloading] = useState(true);
    const [openCloseTab, setopenCloseTab] = useState(false)
    const [mainColor, setMainColor] = useState("")
    const [pageIdx, setPageIdx] = useState(0);
    const [isAlerting, setAlerting] = useState(true)
    const [alertingInfo, setAlertingInfo] = useState("Bem-vindo(a) a nossa Wiki!")
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const RecuperandoDadosResult = async () => {
        try {
            setIsloading(true);
            const sprites: string[] = [];
            const colors: string[] = [];
            const details: PokemonDetails[] = [];
            for (const result of results) {
                const req = await axios.get(`${result.url}`);
                sprites.push(req.data.sprites.front_default);
                details.push(req.data);
                const speciesReq = await axios.get(req.data.species.url);
                colors.push(speciesReq.data.color.name);
            }
            setResultDetails(details);
            setResultSprites(sprites);
            setResultMainColor(colors);
            setIsloading(false);
        } catch (error: any) {
            setAlertingInfo("Ocorreu um erro ao tentar receber os Pokémons, poderia reiniciar a página?")
            setAlerting(true)
            console.log("Error fetching sprites or species data:", error.message);
        }
    };

    const handleSearchFocusShortcut = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "q") {
            e.preventDefault();
            inputRef.current?.focus();

        }
    };
    const playAudio = () => {
        const audioElement = document.getElementById("selectmusic") as HTMLAudioElement;
        if (audioElement) {
            audioElement.play().catch(error => {
                setAlertingInfo("Poxa! A música não pode ser executada, tente reiniciar a página.. ; ) Erro: " + error)
                setAlerting(true)
            });
            setTimeout(() => audioElement.pause(), 1000)
        }
    };


    const handleKeyDown = (e: KeyboardEvent) => {
        if (document.activeElement === inputRef.current) return;

        if (e.key === "ArrowDown") {
            setSelectedIdx((prevIdx) => (prevIdx === null ? 0 : Math.min(prevIdx + 1, results.length - 1)));
        } else if (e.key === "ArrowUp") {
            setSelectedIdx((prevIdx) => (prevIdx === null ? 0 : Math.max(prevIdx - 1, 0)));
        } else if (e.code === "Enter" && selectedIdx == null) {
            console.log(e.key);
        }
    };

    useEffect(() => {
        if (results.length > 0) {
            RecuperandoDadosResult();
        }
        window.addEventListener("keydown", handleSearchFocusShortcut);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleSearchFocusShortcut);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [results]);

    useEffect(() => {
        if (results.length > 0) {
            RecuperandoDadosResult();
        }
    }, [results]);

    return (
        <div className="flex items-center justify-center">
            <audio autoPlay={true} loop controls id="selectmusic"
                className="hidden"
            >
                <source src={selectsound} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <div className="bg-white w-[500px] max-h-[100vh] m-auto p-3 relative rounded-xl shadow-[15px_6px_15px_0px_rgba(0,_0,_0,_0.1)]">
                <SearchBar handleResults={(e: Result[]) =>
                    setResults(e)}
                    page={pageIdx}
                    isAlerting={isAlerting}
                    handleAlertScreen={() => setAlerting(true)}
                    handleAlertinfo={(e: string) => setAlertingInfo(e)}

                />
                <div id="responses-div" className="p-2 bg-white mt-4 h-[450px] overflow-y-auto ">
                    <ul className="flex flex-col gap-4">
                        {results.map((pokemon: Result, idx) => (
                            <motion.li
                                key={idx}
                                className={`min-h-[70px] shadow-[15px_6px_15px_0px_rgba(0,_0,_0,_0.1)] text-[1.3rem] font-bold list-none p-2 rounded-md cursor-pointer hover:bg-slate-300 transition-all duration-300 ease-in-out ${selectedIdx === idx ? "bg-blue-200" : ""
                                    }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                title={pokemon.name}
                                onClick={() => console.log(`Selecionado Pokémon: ${pokemon.name}`)}
                            >
                                <div className="flex items-center space-x-4" onClick={() => {
                                    playAudio();
                                    setPokemonDetails(resultDetails[idx]);
                                    setopenCloseTab(true);
                                    setMainColor(resultMainColor[idx])

                                }}>
                                    {resultSprites[idx] && (
                                        <img
                                            src={resultSprites[idx]}
                                            alt={pokemon.name}
                                            className="w-[50px] h-[50px] backdrop-blur-3xl"
                                            style={{
                                                backgroundColor: resultMainColor[idx],
                                                borderRadius: "50%",
                                            }}
                                        />
                                    )}
                                    <span className="flex flex-col">
                                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                        <ul className="flex gap-1 items-center justify-around">
                                            {resultDetails[idx]?.abilities.slice(0, 3).map((abilities, idx) => (
                                                <li key={idx} className="bg-black rounded-full min-w-[80px] h-[30px] p-1 text-center text-white text-[0.9rem]">
                                                    {abilities.ability.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <ScreenPokemon
                    openCloseTab={openCloseTab}
                    pokemonDetails={pokemonDetails}
                    handleOpenClose={() => setopenCloseTab(false)}
                    color={mainColor}
                />
                <ErrorAlertScreen isAlerting={isAlerting} info={alertingInfo} handleAlertScreen={() => setAlerting(false)} />
                <LoadingScreen isLoading={isLoading} />
                <div className=" h-[100px] mt-2 p-2 flex justify-center items-center translate-y-[-50px] shadow-[0px_-10px_10px_0px_rgba(0,_0,_0,_0.09)]">
                    <motion.button
                        initial={{ width: 5, opacity: 0.7 }}
                        animate={isAlerting ? { width: 5, opacity: 0.7 } : { width: 130, opacity: 1 }}
                        type="button"
                        title="voltar uma página"
                        className="p-2 bg-yellow-600 w-[130px] font-bold text-white rounded-l-full translate-x-[5px] hover:bg-yellow-700 transition duration-500 ease-in-out"
                        onClick={() => pageIdx === 0 ? {} : setPageIdx(pageIdx - 1)}
                    >
                        Voltar
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0.7 }}
                        title="Voltar para o inicio"
                        animate={isAlerting ? { opacity: 0.7 } : { rotate: 360, opacity: 1 }}
                        className="bg-yellow-600 p-4 rounded-[100%]"
                        onClick={() => setPageIdx(0)}
                    >
                        <img src={PokeBola} alt="Pokebola Home" className="w-[70px]" />
                    </motion.button>
                    <motion.button
                        initial={{ width: 5, opacity: 0.7 }}
                        title="Avançar uma página"
                        animate={isAlerting ? { width: 5, opacity: 0.7 } : { width: 130, opacity: 1 }}
                        type="button"
                        className="p-2 bg-yellow-600 w-[130px] font-bold text-white rounded-e-full translate-x-[-5px] hover:bg-yellow-700 transition duration-500 ease-in-out"
                        onClick={() => setPageIdx(pageIdx + 1)}
                    >
                        Avançar
                    </motion.button>
                </div>

            </div>
        </div>
    );
}
