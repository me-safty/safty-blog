import { urlFor } from "../sanity"
import { Author } from "../typing"
import Image from "next/image"
import Baner from "./baner"
import Posts from "./posts"
import RightArrow from "./RightArrow"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface userProps {
	author: Author
}

const User = ({ author }: userProps) => {
	const { data: session } = useSession()
	const ownProfile = author.email === session?.user?.email
	//function onFileChange(event) {

	//function blobToBuffer(blob, cb) {
	//	if (typeof Blob === "undefined" || !(blob instanceof Blob)) {
	//		throw new Error("first argument must be a Blob")
	//	}
	//	if (typeof cb !== "function") {
	//		throw new Error("second argument must be a function")
	//	}

	//	const reader = new FileReader()

	//	function onLoadEnd(e) {
	//		reader.removeEventListener("loadend", onLoadEnd, false)
	//		if (e.error) cb(e.error)
	//		else cb(null, Buffer.from(reader.result))
	//	}

	//	reader.addEventListener("loadend", onLoadEnd, false)
	//	reader.readAsArrayBuffer(blob)
	//}
	//function blobToStream(blob) {
	//	var rs = new stream.Readable()
	//	rs._read = function () {}

	//	blobToBuffer(blob, function haveBuffer(e, buffer) {
	//		if (e) {
	//			rs.emit("error", e)
	//			rs.push(null)
	//		}
	//		rs.push(buffer)
	//		rs.push(null)
	//	})

	//	return rs
	//}
	////const obj = { hello: "world" };
	//const blob = new Blob([JSON.stringify(file, null, 2)], {
	//	type: "application/json",
	//})

	//	// Update the state
	//	this.setState({ selectedFile: event.target.files[0] });

	//};
	// progress
	//const [percent, setPercent] = useState<number>(0)
	//const [link, setLink] = useState<string>("")

	// Handle file upload event and update state

	//console.log(process.env.FIREBASE_STORAGE_BUCKET, process.env.NEXTAUTH_URL)
	//const handleUpload = () => {
	//	if (!file) {
	//		alert("Please upload an image first!")
	//	}
	//	const storageRef = ref(storage, `/images/${file?.name}`)
	//	// progress can be paused and resumed. It also exposes progress updates.
	//	// Receives the storage reference and the file to upload.
	//	const uploadTask = uploadBytesResumable(storageRef, file)
	//	uploadTask.on(
	//		"state_changed",
	//		(snapshot) => {
	//			const percent = Math.round(
	//				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
	//			)
	//			// update progress
	//			setPercent(percent)
	//		},
	//		(err) => console.log(err),
	//		() => {
	//			// download url
	//			getDownloadURL(uploadTask.snapshot.ref).then((url) => {
	//				console.log(url)
	//				setLink(url)
	//			})
	//		}
	//	)
	//}

	// On file upload (click the upload button)
	//async function onFileUpload() {
	//	const formData = new FormData()
	//	formData.append("photo", file as File)
	//	//formData.append("fileName", file?.name as string)
	//	try {
	//		const data = await fetch("/api/upload-api", {
	//			method: "POST",
	//			//headers: { "Content-Type": "multipart/form-data" },
	//			//headers: { "Content-Type": "application/json" },
	//			body: formData,
	//		})
	//		const res = await data.json()
	//		console.log(res)
	//	} catch (error) {
	//		console.log(error)
	//	}
	//}
	return (
		<>
			<div className="w-full h-[180px] bg-green-600 relative">
				<Baner
					firstTitle={ownProfile ? "welcome" : "welcome to"}
					secondTitle={
						ownProfile
							? author.name.split(" ")[0]
							: `${author.name.split(" ")[0]}'s profile`
					}
				/>
				{ownProfile && (
					<Link href="/post-blog">
						<button className="mt-2 absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] shadow-lg group hover:py-3 hover:px-7 active:py-1 active:px-4 bg-orange-300  hover:brightness-95 duration-150 rounded-full flex items-center px-6 py-2 text-white text-2xl font-medium">
							post a blog
							<RightArrow className="h-[23px] w-[23px] ml-2 group-hover:fill-green-600 fill-fuchsia-500 mt-[6px]" />
						</button>
					</Link>
				)}
			</div>
			<div className="container">
				<div>
					<div className="flex gap-5 my-10 items-center">
						<Image
							src={author.imglink ? author.imglink : urlFor(author.image).url()}
							alt="profile image"
							width={140}
							height={140}
							className="rounded-full"
						/>
						<div>
							<p className="text-3xl font-medium mb-1">{author.name}</p>
							{ownProfile && <p className="text-lg">{author.email}</p>}
						</div>
					</div>
				</div>
				<p className="text-3xl font-medium text-green-600 ml-3">
					{ownProfile && "Your "}Posts
				</p>
				<div className="w-full h-[1px] bg-gray-300 ml-3 my-2"></div>
				<div>
					{!author.posts.length && (
						<p className="font-medium text-2xl ml-3 my-10 h-[40vh]">
							No Blogs yet!
						</p>
					)}
					{author.posts && (
						<Posts
							posts={author.posts}
							showDeferentFirstBlog={false}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default User
