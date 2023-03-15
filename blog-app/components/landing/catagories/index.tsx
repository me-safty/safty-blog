import { motion } from "framer-motion"
import { NextPage } from "next"
import Link from "next/link"
import { category } from "../../../typing"
import s from "./categories.module.css"
interface Props {
	catagories: category[]
}

const Catagories: NextPage<Props> = ({ catagories }) => {
	return (
		<motion.div
			initial={{ x: 30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="px-5 py-8 sm:p-8 rounded-xl bg-fuchsia-500 text-white group h-full"
		>
			<div className="mb-5">
				<h1 className="text-3xl font-medium mb-1">Catagories</h1>
				<div className="flex w-20 h-1 gap-1">
					<div className="w-[75%] group-hover:w-[30%] duration-150 rounded-xl bg-orange-300" />
					<div className="w-[25%] group-hover:w-[70%] duration-150 rounded full bg-green-500" />
				</div>
			</div>
			<div
				className={`pb-5 overflow-y-scroll h-[250px] lg:h-[290px] ${s.catagoriesBox}`}
			>
				{catagories.map((e) => (
					<div
						key={e.title}
						className="mb-2 mr-2"
					>
						<h2 className="text-[23px] font-medium">{e.title}</h2>
						{e.posts.map((post) => (
							<Link
								href={`/posts/${post.slug.current}`}
								key={post.title}
							>
								<p className="text-xs mb-2 ml-2 hover:underline text-gray-100">
									- {post.title}
								</p>
							</Link>
						))}
					</div>
				))}
			</div>
		</motion.div>
	)
}

export default Catagories
