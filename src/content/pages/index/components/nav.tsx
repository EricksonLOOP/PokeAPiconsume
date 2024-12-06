import axios from "axios";
import { useEffect, useState } from "react";
import bgsound from "../../../global-components/background-audio.mp3"
export default function SearchBar({ handleResults, page }: { handleResults: Function, page: number }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [allResults, setAllResults] = useState<any[]>([]);

    const RescuperarResultados = async () => {
        try {
            const req = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${20 * page}&limit=20`);
            setAllResults(req.data.results);
            handleResults(req.data.results);
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query === "") {
            handleResults(allResults);
        } else {
            const filteredResults = allResults.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(query.toLowerCase())
            );
            handleResults(filteredResults);
        }
    };
    const handleSearchFocusShortcut = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "///") {
            e.preventDefault();

            document.getElementById("search")?.focus()
        }
    }

    useEffect(() => {
        RescuperarResultados();
    }, [page]);
    useEffect(() => {
        window.addEventListener("keydown", handleSearchFocusShortcut);
        const playAudio = () => {
            const audioElement = document.getElementById("bgmusic") as HTMLAudioElement;
            if (audioElement) {
                audioElement.play().catch(error => {
                    console.log(error);
                });
            }
        };
        window.addEventListener("click", playAudio);

        return () => {
            window.removeEventListener("click", playAudio);
        };
    }, [KeyboardEvent, handleResults]);

    return (
        <nav className="shadow-[0px_1px_10px_2px_rgba(0,_0,_0,_0.2)] rounded-full focus:outline-0 focus:border-blue-600">
            <audio autoPlay={true} loop controls id="bgmusic"
                className="hidden"
            >
                <source src={bgsound} type="audio/mpeg" />
                Seu navegador não suporta o elemento de áudio.
            </audio>
            <label htmlFor="search">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    id="search"
                    title="Search Bar"
                    className="w-full p-3 rounded-full"
                    aria-label="Search"
                    name="Search-bar"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </label>
        </nav>
    );
}
