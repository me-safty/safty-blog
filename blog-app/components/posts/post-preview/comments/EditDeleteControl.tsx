import deleteComment from "../../../../utils/delete"
import Delete from "../../../icons/Delete"
import Edit from "../../../icons/Edit"
import LoadingSpinier from "../../../icons/LoadingSpinier"

interface EditDeleteControlProps {
	setEdit: React.Dispatch<React.SetStateAction<boolean>>
	loading: boolean
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	isClicked: boolean
	setClick: React.Dispatch<React.SetStateAction<boolean>>
	refreshData: () => void
	commentId: string
}

const EditDeleteControl = ({
	setEdit,
	loading,
	setLoading,
	isClicked,
	setClick,
	refreshData,
	commentId,
}: EditDeleteControlProps) => {
	//const [open, setOpen] = useState<boolean>(false);

	//useEffect(() => {
	//	setOpen(false);
	//}, [commentId]);

	return (
		<div className="flex flex-col justify-center gap-[5px] pt-[3px]">
			{/*<button
				onClick={() => setOpen((p) => !p)}
				style={{ transform: open ? "rotate(90deg)" : "" }}
				className="bg-white bg-opacity-50 flex items-center p-[2px] rounded-full duration-150 hover:bg-opacity-80"
			>
				<Dots className="scale-[.80]" />
			</button>*/}
			{loading ? (
				<div className="animate-spin">
					<LoadingSpinier className=" scale-[.60]" />
				</div>
			) : (
				<button
					onClick={() => {
						if (isClicked === false) {
							deleteComment(commentId)
							refreshData()
							setLoading(true)
							setClick(true)
						}
					}}
					style={{
						opacity: isClicked ? 0.5 : 1,
						cursor: isClicked ? "default" : "pointer",
					}}
					className="w-6 h-[50%] flex items-center justify-center bg-gray-100 font-normal rounded-[7.5px] bg-opacity-50 duration-150 hover:bg-opacity-80 text-sm"
				>
					<Delete className="w-[13px] h-4" />
				</button>
			)}
			<button
				onClick={() => {
					if (isClicked === false) {
						setEdit((p) => !p)
					}
				}}
				style={{
					opacity: isClicked ? 0.5 : 1,
					cursor: isClicked ? "default" : "pointer",
				}}
				className="w-6 h-[50%] flex items-center justify-center bg-gray-100 font-normal rounded-[7.5px] bg-opacity-50 duration-150 hover:bg-opacity-80 text-sm"
			>
				<Edit className="w-[13px] h-4" />
			</button>
		</div>
	)
}

export default EditDeleteControl
