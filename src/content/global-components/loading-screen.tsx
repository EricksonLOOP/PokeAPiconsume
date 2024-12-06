
import { motion } from "framer-motion"
import Pikachugif from "../imgs/pikachu-loading.gif"
import { useState } from "react";

//  10 curiosiadades sobre pokémons
const pokemonCuriosities = [
    "Você sabia que o Pikachu foi inspirado em um animal real? Ele é baseado no pika, um roedor pequeno que vive nas montanhas da Ásia e América do Norte!",
    "Atualmente, existem mais de 1000 espécies de Pokémon. A franquia começou com 151, mas o número cresceu muito desde 1996!",
    "Tem uma teoria interessante de que o Ditto é um experimento falho de Mew. Eles compartilham algumas características, como a cor e o peso!",
    "O Eevee é o Pokémon com mais evoluções diferentes! São 8 formas ao todo, e cada uma depende de como você o evolui.",
    "Magikarp é conhecido por ser o Pokémon mais fraco, mas quando ele evolui para Gyarados, se transforma em um dos mais poderosos!",
    "Já ouviu falar que o Wobbuffet pode estar escondendo seu verdadeiro corpo? Alguns fãs acreditam que a pequena cauda com olhos é o verdadeiro Wobbuffet!",
    "Você sabia que Porygon é o único Pokémon banido do anime? Um episódio com ele causou problemas de saúde em várias crianças no Japão, e desde então ele não aparece mais.",
    "No anime, Meowth da Equipe Rocket é o único Pokémon que aprendeu a falar como humanos! Ele fez isso para impressionar uma fêmea, mas acabou não conseguindo evoluir.",
    "O design de Jynx teve que ser alterado após uma polêmica. Ela tinha pele preta no início, mas mudou para roxo por causa de críticas.",
    "Uma curiosidade sobre Kadabra: ele causou uma controvérsia com um famoso paranormal chamado Uri Geller, que processou a Nintendo por achar que o Kadabra foi inspirado nele!"
];

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
    const [info, setInfo] = useState(0)
    //1s não é muita coisa, mas eu aumentava e não mudou nada, deixa assim...
    setTimeout(() => {
        let num = Math.floor(Math.random() * 10)
        setInfo(num)
    }, 1000)
    return (
        <motion.div
            initial={{ display: "none", opacity: 0 }}
            animate={isLoading ? { display: "block", opacity: 1 } : { display: "none", opacity: 0 }}
            className="bg-white absolute z-10 h-[100%] top-0 left-0 w-[100%]">
            <img src={Pikachugif} alt="Pikachu guardando cartas na bolsinha" />
            <p className="text-center font-extrabold bg-white translate-y-[-50px] ">
                Carregando..</p>
            <p className="text-center font-bold bg-white translate-y-[-50px] w-[270px] m-auto">
                {pokemonCuriosities[info]}</p>
        </motion.div>
    )
}