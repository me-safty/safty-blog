const Footer = () => {
	return (
		<footer className="py-7 sm:py-10 bg-green-700 text-white relative">
			<div className="flex absolute top-0 w-full h-2">
				<div className="w-[50%] h-full bg-orange-400" />
				<div className="w-[50%] h-full bg-fuchsia-600" />
			</div>
			<div className="container">
				<div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-between">
					<h1 className="font-bold text-center w-fit text-xl md:text-[26px] cursor-pointer relative">
						Safty Blog
						<div className="h-[3.5px] rounded-lg w-[40px] bg-orange-300 absolute -bottom-1 -left-1" />
						<div className="w-3 h-3 rounded-full border-[3.4px] border-fuchsia-500 absolute top-0 -right-4" />
					</h1>
					<p className="text-sm">
						created & designed by{" "}
						<span className="underline">Mohamed Safty</span>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
