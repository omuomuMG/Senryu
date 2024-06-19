"use client";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import  { db } from "../Firebase";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "@/app/page";
import { useRouter } from "next/navigation";

export default function EditContent() {
	const titleRef = useRef<HTMLTextAreaElement | null>(null);
	const bodyRef = useRef<HTMLTextAreaElement | null>(null);
	const router = useRouter();

	const { id, title, body, rating } = useStore((state) => ({
		id: state.id,
		title: state.title,
		body: state.body,
		rating: state.rating,
	}));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		toast.loading("本を書き換え中", {
			duration: 3000,
		});
		const newContent: Content = {
			body: bodyRef?.current?.value,
			id: id,
			title: titleRef?.current?.value,
			rating: 4,
		};
		await updateDoc(doc(db, "user1", newContent?.id as string), newContent);
		toast.success("本を書き換えました！", {
			duration: 3000,
		});
		router.push("/");
		router.refresh();
	};

	return (
		<>
			<div>
				<h1>{id}</h1>
				<h1>{body}</h1>
				<Toaster />
				<h1>本を記録</h1>
				<form onSubmit={handleSubmit}>
					<label>
						本の名前:
						<textarea
							ref={titleRef}
							placeholder=""
							className="rounded-md px-4 py-2 w-full my-2"
						>
							{title}
						</textarea>
						感想:
						<textarea
							ref={bodyRef}
							placeholder="記事詳細を入力"
							className="rounded-md px-4 py-2 w-full my-2"
						>
							{body}
						</textarea>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</>
	);
}
