"use client";
import { doc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useRef } from "react";
import db from "../Firebase";
db;
type Content = {
	id: string;
	title: string | undefined;
	body: string | undefined;
	rating: number;
};

export default function PostContent() {
	const titleRef = useRef<HTMLInputElement | null>(null);
	const bodyRef = useRef<HTMLTextAreaElement | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newContent: Content = {
			body: bodyRef?.current?.value,
			id: Math.random().toString(32).substring(2),
			title: titleRef?.current?.value,
			rating: 4,
		};
		await setDoc(doc(db, "user1", newContent?.id as string), newContent);
	};
	return (
		<>
			<div>
				<h1>本を記録</h1>
				<form onSubmit={handleSubmit}>
					<label>
						本の名前:
						<input type="text" name="title" ref={titleRef} />
						感想:
						<textarea
							ref={bodyRef}
							placeholder="記事詳細を入力"
							className="rounded-md px-4 py-2 w-full my-2"
						></textarea>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</>
	);
}
