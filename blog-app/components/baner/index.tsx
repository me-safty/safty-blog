import { motion } from "framer-motion"
import brush from "../../public/brush.png"
import Image from "next/image"

interface banerProps {
	firstTitle?: string
	secondTitle?: string
}

const Baner = ({
	firstTitle = "all in one place ",
	secondTitle = "Safty Blog",
}: banerProps) => {
	return (
		<div className="container">
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="rounded-xl overflow-hidden bg-green-600 flex items-center justify-center h-[160px] sm:h-[180px] relative"
			>
				<h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 relative text-3xl sm:text-4xl tracking-wide text-white font-light">
					{firstTitle}
					<span className="text-3xl sm:text-[40px] font-medium">
						{secondTitle}
					</span>
					<div className="h-[3.5px] rounded-lg w-14 sm:w-[80px] bg-orange-300 absolute -bottom-[4px] sm:-bottom-2 left-4 sm:-left-3" />
					<div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full border-4 sm:border-[5px] border-fuchsia-500 absolute top-10 sm:-top-1 right-4 sm:-right-7" />
				</h1>
				<motion.div
					animate={{ y: 1, opacity: 1 }}
					initial={{ y: -100, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="w-[120px] p-4 rounded-md bg-white bg-opacity-30 absolute top-[45px] lg:block hidden left-[70px]"
				>
					<div className="h-[3px] rounded-lg w-full bg-white mb-[6px]" />
					<div className="h-[3px] rounded-lg w-[60%] bg-white" />
				</motion.div>
				<motion.div
					animate={{ y: 1, opacity: 1 }}
					initial={{ y: -100, opacity: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="w-[100px] p-4 rounded-md bg-white bg-opacity-30 absolute top-[105px] left-[120px] xl:left-[150px] lg:block hidden"
				>
					<div className="h-[3px] rounded-lg w-full bg-white" />
				</motion.div>
				<Image
					width={500}
					height={200}
					src={brush.src}
					alt="bg"
					priority
					className="w-full absolute z-0 opacity-30 bottom-0 right-[-755px] lg:block hidden"
				/>
			</motion.div>
		</div>
	)
}

export default Baner
