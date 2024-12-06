import { useState, useEffect } from "react";
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
    //Consts do primeiro Resultado:
    const [results, setResults] = useState<Result[]>([]);
    const [resultSprites, setResultSprites] = useState<string[]>([]);
    const [resultMainColor, setResultMainColor] = useState<string[]>([]);
    const [resultDetails, setResultDetails] = useState<PokemonDetails[]>([]);
    // Detalhes para o ShowPokémon
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [mainColor, setMainColor] = useState("")
    //Consts que permitem interação com o estado da página, navegação, atualização, fechar, etc..
    const [isLoading, setIsloading] = useState(true);
    const [openCloseTab, setopenCloseTab] = useState(false)
    const [pageIdx, setPageIdx] = useState(0);
    const [isAlerting, setAlerting] = useState(true)
    const [alertingInfo, setAlertingInfo] = useState("Bem-vindo(a) a nossa Wiki!")
    const [selectedIdx, setSelectedIdx] = useState<number>(0);



    //Chamando EndPoint principal para receber os pokemons dá pagina
    const RecuperandoDadosResult = async () => {
        try {
            //Inicia tela de carregamendo
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
            // Setando o valor de cada lista nos UseState desejados
            setResultDetails(details);
            setResultSprites(sprites);
            setResultMainColor(colors);
            setIsloading(false);
        } catch (error: any) {
            //Ativando o alert caso tenha algum erro aos procedimentos
            setAlertingInfo("Ocorreu um erro ao tentar receber os Pokémons, poderia reiniciar a página?")
            setAlerting(true)
        }
    };

    // Para deixar o menu mais legal, ou vai dizer que não gostou da músiquinha?
    // Isso aqui toca um som de select quando clica para ver um Pokémon "tiririinn".
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

    // Executada quando há algum evento do teclado, permitindo que use as teclas Down e Up para navegar entre
    // Os Cards ou que você acesse determinado pokémon com o enter, através de seu index -\(- -)/-
    const handleKeyDown = (e: KeyboardEvent) => {

        setSelectedIdx((prevIdx) => {
            let newIdx = prevIdx;

            if (e.key === "ArrowDown") {
                newIdx = prevIdx === null ? 0 : Math.min(prevIdx + 1, results.length - 1);
            } else if (e.key === "ArrowUp") {
                newIdx = prevIdx === null ? 0 : Math.max(prevIdx - 1, 0);
            }
            // Os UseStates agem de forma assíncrona, só espere um pouco e relaxe 💤
            setTimeout(() => {
                if (e.key === "Enter" && newIdx != null) {

                    setopenCloseTab(newIdx !== null);
                }
            }, 200);

            return newIdx;
        });
    };

    // Executado sempre que o selectedIdx muda, pois precisamos setar o novo index para - 
    // acessar o idx em foco. - Pelo menos ele se torna maior, diferente de nós..
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        setSelectedIdx(selectedIdx !== 0 ? selectedIdx : 0)
        setPokemonDetails(resultDetails[selectedIdx])
        setMainColor(resultMainColor[selectedIdx])
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [resultDetails, selectedIdx]);

    // Recupera os dados quando o resultado é mudado
    useEffect(() => {
        if (results.length > 0) {
            RecuperandoDadosResult();
        }
    }, [results]);

    return (
        <div className="flex items-center ">
            <audio autoPlay={true} loop controls id="selectmusic"
                className="hidden"
            >
                <source src={selectsound} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <div className="bg-white w-[100%] md:w-[500px] h-[97vh] md:h-[100vh]  m-auto p-3 relative rounded-xl shadow-[15px_6px_15px_0px_rgba(0,_0,_0,_0.1)]">
                <SearchBar handleResults={(e: Result[]) =>
                    setResults(e)}
                    page={pageIdx}
                    isAlerting={isAlerting}
                    handleAlertScreen={() => setAlerting(true)}
                    handleAlertinfo={(e: string) => setAlertingInfo(e)}

                />
                <div id="responses-div" className="p-2 bg-white mt-4 h-[450px] overflow-y-auto ">
                    <ul className="flex flex-col gap-4">
                        {/*Isso aqui lista todos os Pokémons de uma página X ou Y*/}
                        {results.map((pokemon: Result, idx) => (
                            <motion.li
                                key={idx}
                                className={`
                                    min-h-[70px] shadow-[15px_6px_15px_0px_rgba(0,_0,_0,_0.1)] text-[1.3rem] 
                                    font-bold list-none p-2 rounded-md cursor-pointer hover:bg-slate-300 
                                    overflow-hidden
                                    transition-all duration-300 ease-in-out ${selectedIdx === idx ? "bg-blue-200 sticky top-2 bottom-2 z-10" : ""
                                    }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                title={pokemon.name}
                                onClick={() => setSelectedIdx(idx)}
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
                                    <span className="flex flex-col overflow-x-auto">
                                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                        <ul className="flex gap-[1px] items-center justify-around overflow-x-auto">
                                            {resultDetails[idx]?.abilities.slice(0, 3).map((abilities, idx) => (
                                                <li key={idx} className="bg-black rounded-full w-[80px] h-[30px] p-1 text-center text-white text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
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
                {/* 
                Estas telas Screen, Error, Loading só são ativadas quando setadas como TRUE.
                - Desta vez a verdade tem que ser explicita, ao invés do que ela me contava.
                */}
                <ScreenPokemon
                    openCloseTab={openCloseTab}
                    pokemonDetails={pokemonDetails}
                    handleOpenClose={() => setopenCloseTab(false)}
                    color={mainColor}
                />
                <ErrorAlertScreen isAlerting={isAlerting} info={alertingInfo} handleAlertScreen={() => setAlerting(false)} />
                <LoadingScreen isLoading={isLoading} />
                {/*Botôes de navegação do Pokédex virtual */}
                <div className=" h-[50px] mt-2 p-2 flex justify-center items-center translate-y-[30px] md:translate-y-[-50px] shadow-[0px_-10px_10px_0px_rgba(0,_0,_0,_0.09)]">
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
