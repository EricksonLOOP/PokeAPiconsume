import { motion } from "framer-motion";
import { PokemonDetails } from "../../../interfaces/pokemon";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ScreenPokemon({ openCloseTab, pokemonDetails, handleOpenClose, color }:
    { openCloseTab: boolean, pokemonDetails: PokemonDetails | null, handleOpenClose: Function, color: string }) {
    const [image, setImages] = useState("")
    const [ActualWidth, setActualWidth] = useState(window.innerWidth)
    useEffect(() => {
        const pegarImgsBoas = async () => {
            const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonDetails?.id}/`)
            setImages(req.data.sprites.other.dream_world.front_default)
        }
        pegarImgsBoas()
    }, [pokemonDetails])
    useEffect(() => {
        setActualWidth(window.innerWidth)
    }, [window.innerWidth])
    return (

        <motion.div
            initial={{ opacity: 0, display: "none", width: "1%" }}
            animate={openCloseTab ? { opacity: 1, display: "block", width: "100%" } : { opacity: 0, display: "none", width: "1%" }}
            className="absolute top-0 left-0 p-5 w-[100%] h-[100%] bg-white z-10 overflow-hidden pokemon-tab shadow-[inset_0px_4px_14px_17px_rgba(0,_0,_0,_0.1)] rounded-xl">
            <motion.div className="w-[100%] h-[400px] flex flex-col justify-center  items-center">
                <motion.img
                    initial={{ translateX: -435, display: "none" }}
                    animate={openCloseTab ? { translateX: 0, display: "block" } : { translateX: -135, display: "none" }}
                    transition={{
                        delay: 0.6
                    }}
                    className="w-[800px] pokemon"
                    src={image}
                    alt="Imagem do pokemon"
                />
            </motion.div>
            <motion.button
                onClick={() => handleOpenClose()}
                className="absolute left-0 top-2  z-40 w-[120px] h-[40px] shadow-[0px_-30px_15px_2px_rgba(0,_0,_0,_0.5)] flex items-center justify-center rounded-e-full  text-red-600 font-extrabold bg-white"
            >

                <svg className="rotate-[180deg]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#E53935"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                Voltar
            </motion.button>
            <div className="relative">
                <motion.div
                    title={pokemonDetails?.name + ` Informações`}
                    animate={{
                        opacity: openCloseTab ? 1 : 0,
                        translateX: openCloseTab ? ActualWidth > 500 ? -155 : -200 : -300,
                        rotate: openCloseTab ? 20 : 0,
                        scale: openCloseTab ? 1 : 0.8,
                    }}
                    transition={{ delay: 0.3 }}
                    className={`bg-gradient-to-tr to-gray-600 from-slate-950 w-[700px] translate-x-[-355px] md:translate-x-[-155px] h-[500px] rotate-[20deg] shadow-[0px_-30px_15px_2px_rgba(0,_0,_0,_0.5)] absolute z-10`}>
                    <div className="rotate-[-20deg] translate-x-[145px]  translate-y-[-45px] ">
                        <h2
                            title={`Nome Pokemon: ${pokemonDetails?.name}`}
                            className="font-bold text-[3rem] mt-5 text-white flex items-center justify-start gap-2 ">
                            {pokemonDetails?.name.charAt(0).toUpperCase()}{pokemonDetails?.name.slice(1)}
                            <b title="Nivel Pokemon" className="font-bold text-[1rem] mt-5 text-black bg-white rounded-full p-1 translate-y-[-5px]"> Lv.{Math.floor(Math.random() * (100 - 10 + 1)) + 10}</b>
                        </h2>
                        <div className="block rounded-md shadow-[0px_-0px_15px_2px_rgba(0,_0,_0,_0.5)] w-[350px] bg-gradient-to-tr from-slate-200 to-slate-500  p-2 text-[1.3rem] font-semibold">
                            Aeos Trainer 1
                            <ul className="flex p-2 gap-6 items-center bg-slate-600 rounded-lg justify-between">
                                <li className="flex items-center font-extrabold text-[1.4rem]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="50px"
                                        viewBox="0 -960 960 960"
                                        width="50px" fill="#e8eaed"
                                        xlinkTitle="Força Pokemon"
                                    >
                                        <path d="m452-160 200-390H512v-250L312-410h140v250Zm28 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                                    </svg>
                                    {Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000}
                                </li>
                                <li className="flex flex-row-reverse items-center font-extrabold text-[1.4rem]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="50px"
                                        viewBox="0 -960 960 960"
                                        width="50px"
                                        fill="#e8eaed"
                                        xlinkTitle="Defesa Pokemon"
                                    ><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-499L256-405q19 63 56 114.5t88 86.5v-156h160v156q51-35 88-86.5T704-405L480-579Zm0-216-240 90v189q0 5 .5 11t.5 11l239-186 239 186q0-5 .5-11t.5-11v-189l-240-90Z" />
                                    </svg>
                                    <b>{Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000}</b>
                                </li>
                            </ul>
                        </div>

                    </div>
                </motion.div>
                <motion.div
                    animate={openCloseTab ? { opacity: 1, translateX: 0, rotate: -20 } : { opacity: 0, display: "none", width: "1%", translateX: -300, rotate: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        backgroundImage: `linear-gradient(to right, white 0%, ${color} 60%)`
                    }}
                    className=" w-[700px] translate-x-[0px] h-[500px] rotate-[-20deg] shadow-[0px_-30px_15px_2px_rgba(0,_0,_0,_0.5)] ">

                    <div className="rotate-[-20deg] translate-x-[155px] ">

                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}