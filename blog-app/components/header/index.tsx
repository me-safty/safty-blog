import Link from "next/link"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { Author } from "../../typing"

const Header = () => {
	const { data: session } = useSession()
	//const [active, setActive] = useState<boolean>(false)
	//const id = authors.find(e => e.email == session?.user?.email)._id
	//useEffect(() => {
	//	async function handleSignIn() {
	//		try {
	//			await fetch("/api/create-author", {
	//				method: "POST",
	//				headers: { "Content-Type": "application/json" },
	//				body: JSON.stringify({
	//					name: session?.user?.name,
	//					email: session?.user?.email,
	//					image: session?.user?.image,
	//				}),
	//			})
	//		} catch (error) {
	//			console.log(error)
	//		}
	//	}
	//	if (session && isFirstTime) {
	//		isFirstTime = false
	//		const existingEmail = authors.find((e) => e.email == session?.user?.email)
	//		console.log(existingEmail, isFirstTime)
	//		if (!existingEmail) {
	//			handleSignIn()
	//			console.log(existingEmail, "author created")
	//		}
	//	}
	//}, [])
	return (
		<header className="py-8 px-1">
			<div className="container flex justify-between relative items-center">
				<div className="flex items-center justify-center gap-6">
					<Link href="/">
						<h1 className="font-bold text-xl md:text-[26px] cursor-pointer relative">
							Safty Blog
							<div className="h-[3.5px] rounded-lg w-[40px] bg-orange-300 absolute -bottom-1 -left-1" />
							<div className="w-3 h-3 rounded-full border-[3.4px] border-fuchsia-500 absolute top-0 -right-4" />
						</h1>
					</Link>
					{/*<nav className="hidden md:flex items-center justify-center gap-3">
						<h3 className="cursor-pointer hover:text-green-600 duration-300">
							About
						</h3>
						<h3 className="cursor-pointer hover:text-green-600 duration-300">
							Contact
						</h3>
						<h3 className="bg-green-600 rounded-full py-1 px-4 text-white cursor-pointer hover:bg-white border border-green-600 hover:text-green-600 duration-300">
							Follow
						</h3>
					</nav>*/}
				</div>
				{session ? (
					<div
						className="flex items-center gap-2 group duration-300 group"
						//onClick={() => setActive(true)}
					>
						<button
							//className="py-1 px-3 border text-base border-green-600 text-green-600 rounded-full cursor-pointer duration-150 hover:bg-green-600 hover:text-white"
							className="text-green-600 cursor-pointer duration-15 hover:text-black"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
						<Link
							href={`/users/${
								session.user?.email?.toLowerCase().split("@")[0]
							}`}
							className="flex items-center gap-2 group/1"
						>
							<p className="text-lg group-hover/1:text-green-600 duration-150">
								{session.user?.name}
							</p>
							<Image
								alt="user image"
								src={session.user?.image as string}
								width={45}
								height={45}
								className="object-cover rounded-full w-[45px] h-[45px] cursor-pointer"
								//onClick={() => setActive(true)}
							/>
						</Link>
					</div>
				) : (
					<div className="text-xs md:text-base flex items-center justify-center gap-2 md:gap-5 text-green-600">
						<button className="cursor-pointer hover:text-black duration-300">
							Sign in
						</button>
						<button
							onClick={() => signIn()}
							className="cursor-pointer border border-green-600 rounded-full px-2 md:px-4 py-1 hover:bg-green-600 hover:text-white duration-300"
						>
							Get Started
						</button>
					</div>
				)}
				{/*{active && (
					<div className="flex flex-col items-center gap-1 group duration-300 group shadow-md p-4 rounded-xl bg-orange-300 absolute right-3 z-10">
						<div className="flex items-center gap-2 group duration-300 group mb-2">
							<p>{session?.user?.name}</p>
							<Image
								alt="user image"
								src={session?.user?.image as string}
								width={45}
								height={45}
								className="object-cover rounded-full w-[45px] h-[45px]"
								onClick={() => setActive(false)}
							/>
						</div>
						<p>{session?.user?.email}</p>
						<button
							className="py-1 px-3 w-full border bg-green-600 border-green-600 text-white rounded-xl cursor-pointer duration-150 hover:bg-orange-300 hover:text-green-600"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
					</div>
				)}*/}
			</div>
		</header>
	)
}

export default Header
