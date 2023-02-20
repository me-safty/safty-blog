import React, { useEffect } from "react"
import { category } from "../../typing"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { createClient } from "next-sanity"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Image from "next/image"
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import Baner from "../baner"
import { useSession } from "next-auth/react"
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface IFormProps {
	_id: string
	title: string
	categoryId: string
	imageId: string
	mdbody: string
	description: string
	slug: string
}

interface BlogFormProps {
	categories: category[]
}

export const sanityConfig = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	useCdn: process.env.NODE_ENV === "production",
	apiVersion: "2022-12-17",
	token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
}

const sanityClint = createClient(sanityConfig)

const BlogForm = ({ categories }: BlogFormProps) => {
	const { data: session } = useSession()
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
	const [mdValue, setMdValue] = useState<string | undefined>("")
	const [file, setFile] = useState<File>()
	const [mdError, setMdError] = useState<boolean>(false)
	const [notImgError, setNotImgError] = useState<boolean>(false)

	const router = useRouter()

	useEffect(() => {
		if (mdValue) setMdError(false)
	}, [mdValue])

	useEffect(() => {
		if (file?.type.slice(0, 5) === "image") {
			setNotImgError(false)
		} else if (file) {
			setNotImgError(true)
		}
	}, [file])

	const { register, handleSubmit } = useForm<IFormProps>()

	const onSubmit: SubmitHandler<IFormProps> = async (data) => {
		if (!selectedCategoryId && !file) {
			console.error("category and image field empty")
		} else if (!mdValue) {
			setMdError(true)
		} else if (file?.type.slice(0, 5) !== "image") {
			setNotImgError(true)
		} else {
			try {
				await sanityClint.assets
					.upload("image", file as File)
					.then((imageAsset) => {
						data.imageId = imageAsset._id as string
					})
				data.categoryId = selectedCategoryId
				data.mdbody = mdValue as string
				data.slug = data.title.toLowerCase().split(" ").join("-")
				await fetch("/api/create-post", {
					method: "POST",
					body: JSON.stringify(data),
				})
				router.push(`/posts/${data.slug}`)
			} catch (error) {
				console.log(error)
			}
		}
		console.log(data)
	}
	return (
		<div className="bg-gray-50 py-10">
			<Baner
				firstTitle="tell your"
				secondTitle="Story."
			/>
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				exit={{ scale: 0.95, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.1 }}
				className="container"
			>
				<form
					className="w-full py-10"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="">
						<div className="">
							<input
								{...register("_id")}
								type="hidden"
								name="_id"
								//@ts-ignore
								value={session?.user?.id}
							/>
							<label
								htmlFor="title"
								className="block mb-1 text-lg"
							>
								Title
							</label>
							<input
								{...register("title", { required: true })}
								type="text"
								name="title"
								id="title"
								className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
								placeholder="Title"
								required
							/>
							<hr className="my-3" />
							<label
								htmlFor="description"
								className="block mb-1 text-lg"
							>
								Description
							</label>
							<textarea
								{...register("description", { required: true })}
								rows={5}
								name="description"
								id="description"
								placeholder="Description"
								required
								className="w-full rounded outline-none border border-gray-300 py-2 px-3 mb-2 shadow focus:shadow-lg duration-300"
							/>
							<hr className="my-3" />

							<label
								htmlFor="category"
								className="block mb-1 text-lg"
							>
								Category
							</label>
							<select
								name="categories"
								id="categories"
								value={selectedCategoryId}
								onChange={(e) => setSelectedCategoryId(e.target.value)}
								required
								className="my-3"
							>
								<option value="">select category</option>
								{categories?.map((option, index) => {
									return (
										<option
											key={index}
											value={option._id}
										>
											{option.title}
										</option>
									)
								})}
							</select>
						</div>
					</div>
					<div className="">
						<hr className="my-3" />

						<p className="my-2 text-lg">Body</p>
						{mdError && (
							<p className="text-red-500 my-2 text-lg">
								please fill out this field
							</p>
						)}
						<div className="my-4">
							<MDEditor
								value={mdValue}
								onChange={setMdValue}
								//preview="edit"
								height={400}
							/>
						</div>
						<hr className="mb-3 mt-6" />
						<div>
							<label
								htmlFor="photo"
								className="block mb-1 text-lg"
							>
								Choose the photo
							</label>

							{notImgError && (
								<p className="text-red-500 text-lg my-2">
									please select images only
								</p>
							)}
							<input
								type="file"
								name="photo"
								id="photo"
								//@ts-ignore
								onChange={(e) => setFile(e.target!.files[0]!)}
								accept="image/*"
								required
							/>
							{file?.type.slice(0, 5) === "image" ? (
								<Image
									width={300}
									height={200}
									src={URL.createObjectURL(file as File)}
									alt="upload image"
									className="w-[300px] h-[200px] object-cover my-5"
								/>
							) : (
								<div className="w-[300px] h-[200px] bg-gray-100 my-5"></div>
							)}
						</div>
					</div>
					<input
						type="submit"
						value="Submit"
						className="bg-green-600 text-white w-full p-2 rounded text-lg cursor-pointer shadow-md hover:bg-green-500 duration-300"
					/>
				</form>
			</motion.div>
		</div>
	)
}

export default BlogForm
