"use client";
import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import db from "../../Firebase";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "@/app/page";

type Content = {
	id: string;
	title: string | undefined;
	body: string | undefined;
	rating: number;
};

export default function EditContent() {
	const titleRef = useRef<HTMLInputElement | null>(null);
	const bodyRef = useRef<HTMLTextAreaElement | null>(null);

	let getContent: Content = {
		id: "",
		title: undefined,
		body: undefined,
		rating: 0,
	};
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
			id: Math.random().toString(32).substring(2),
			title: titleRef?.current?.value,
			rating: 4,
		};
		await updateDoc(doc(db, "user1"), newContent);
		toast.success("本を書き換えました！", {
			duration: 3000,
		});
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
						<input type="text" name="title" ref={titleRef} value={title} />
						感想:
						<textarea
							ref={bodyRef}
							placeholder="記事詳細を入力"
							className="rounded-md px-4 py-2 w-full my-2"
							value={body}
						></textarea>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</>
	);
}
