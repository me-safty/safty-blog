import { motion } from "framer-motion"
import RightArrow from "../icons/RightArrow"

interface ButtonProps {
	title: string
	onClick: () => void
}

const Button = ({ title, onClick }: ButtonProps) => {
	return (
		<motion.div
			className=""
			initial={{ scale: 0.9, opacity: 0 }}
			whileInView={{ scale: 1, opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<button
				onClick={() => onClick()}
				className="absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] shadow-lg group hover:px-7 active:py-1 active:px-4 bg-orange-300 hover:tracking-wider hover:brightness-100 duration-150 rounded-full flex items-center px-6 py-2 text-white whitespace-nowrap text-[17.5px] sm:text-2xl font-medium"
			>
				{title}
				<RightArrow className="h-[22px] w-[22px] ml-2 fill-fuchsia-500 mt-[6px]" />
			</button>
		</motion.div>
	)
}

export default Button
