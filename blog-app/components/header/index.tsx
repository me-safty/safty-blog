import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
	const { data: session } = useSession()
	return (
		<header className="py-8 px-1">
			<div className="container flex justify-between relative items-center">
				<div className="flex items-center justify-center gap-6">
					<Link href="/">
						<h1 className="font-bold text-[22px] md:text-[26px] cursor-pointer relative">
							Safty Blog
							<div className="h-[3.5px] rounded-lg w-[40px] bg-orange-300 absolute -bottom-1 -left-1" />
							<div className="w-3 h-3 rounded-full border-[3.4px] border-fuchsia-500 absolute top-0 -right-4" />
						</h1>
					</Link>
				</div>
				{session ? (
					<div className="flex items-center gap-2 group duration-300 group">
						<button
							className="hidden sm:block text-green-600 cursor-pointer duration-15 hover:text-black"
							onClick={() => signOut()}
						>
							Sign Out
						</button>
						<Link
							href={`/users/${
								session.user?.email?.toLowerCase().split("@")[0]
							}`}
							className="flex items-center gap-2"
						>
							<div className="text-end">
								<p className="sm:text-lg duration-150">{session.user?.name}</p>
								<button
									className="text-[15px] sm:hidden text-green-600 cursor-pointer duration-15 hover:text-black"
									onClick={() => signOut()}
								>
									Sign Out
								</button>
							</div>
							<Image
								alt="user image"
								src={session.user?.image as string}
								width={45}
								height={45}
								className="object-cover rounded-full w-[45px] h-[45px] cursor-pointer"
							/>
						</Link>
					</div>
				) : (
					<div className="text-xs md:text-base flex items-center justify-center gap-2 md:gap-5 text-green-600">
						<button
							onClick={() => signIn()}
							className="cursor-pointer border border-green-600 rounded-full text-[15px] px-4 py-2 hover:bg-green-600 hover:text-white duration-300"
						>
							Get Started
						</button>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
