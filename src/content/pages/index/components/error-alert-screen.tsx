import { motion } from "framer-motion";

export default function ErrorAlertScreen({ info, isAlerting, handleAlertScreen, }: { info: String, isAlerting: boolean, handleAlertScreen: Function }) {
    return (
        <motion.div
            initial={{ opacity: 0, display: "none", width: "1%" }}
            animate={isAlerting ? { opacity: 1, display: "block", width: "100%" } : { opacity: 0, display: "none", width: "1%" }}
            className="absolute top-0 left-0 p-5 w-[100%] h-[100%]  z-10 overflow-hidden  shadow-[inset_0px_4px_14px_17px_rgba(0,_0,_0,_0.1)] rounded-xl alert-screen">
            <div
                className="
            border border-yellow-500 p-2 
            text-center flex flex-col items-center 
            justify-center rounded-lg
            text-[1.3rem] font-bold text-white
            bg-gradient-to-tr from-indigo-950 to-slate-500
            mt-[200px]
            ">
                {info}
                <button
                    className="
                 bg-blue-950 w-[100px] 
                 rounded-md border border-orange-400
                  hover:bg-blue-900"
                    onClick={() => handleAlertScreen()}
                >
                    OK!</button>
            </div>
        </motion.div>
    )
}