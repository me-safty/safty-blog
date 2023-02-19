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
		//<div className="container border-b-2 border-black flex items-center justify-between py-10 px-3.5  md:py-16 md:px-6 bg-yellow-400">
		//	<div>
		//		<h1 className="text-4xl md:text-5xl font-serif mb-4 max-w-md">
		//			<Link
		//				className="underline cursor-pointer decoration-4f"
		//				href="/"
		//			>
		//				Safty Blog
		//			</Link>{" "}
		//			is a place to write, read, and connect
		//		</h1>
		//		<p className="text-xs md:text:sm max-w-lg">
		//			It's easy and free to post your thinking on any topic and connect with
		//			millions of readers.
		//		</p>
		//	</div>
		//	<div
		//		className="hidden lg:block font-serif font-extrabold select-none scale-90"
		//		style={{
		//			fontSize: "20rem",
		//			lineHeight: "16rem",
		//		}}
		//	>
		//		<h1>M</h1>
		//	</div>
		//</div>
		<div className="container">
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="rounded-xl overflow-hidden bg-green-600 flex items-center justify-center h-[160px] sm:h-[180px] relative"
			>
				<h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 relative text-2xl sm:text-4xl tracking-wide text-white font-light">
					{firstTitle}
					<span className="text-2xl sm:text-[40px] font-medium uns">
						{secondTitle}
					</span>
					<div className="h-[3.5px] rounded-lg w-12 sm:w-[80px] bg-orange-300 absolute -bottom-[2px] sm:-bottom-2 left-3 sm:-left-3" />
					<div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full border-4 sm:border-[5px] border-fuchsia-500 absolute top-9 sm:-top-1 right-2 sm:-right-7" />
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
