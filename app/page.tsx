"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import db from "./Firebase";
import Link from "next/link";

type Content = {
	id: string;
	title: string;
	body: string;
	rating: number;
};

export default function Home() {
	const [Contents, setContents] = useState<Content[]>([]);

	useEffect(() => {
		fetchContents();
	}, []);
	const fetchContents = async () => {
		try {
			const contentsCollectionRef = collection(db, "user1");
			const querySnapShot = await getDocs(contentsCollectionRef);
			const contentsData: Content[] = [];
			querySnapShot.forEach((doc) => {
				contentsData.push(doc.data() as Content);
			});
			setContents(contentsData);
		} catch (e) {
			console.log("Error featching contents", e);
		}
	};
	return (
		<>
			<div>
				<Link href="/PostContent/">a</Link>
				<h1>Content</h1>
				{Contents.map((content) => (
					<>
						<div>
							<h2>{content.title}</h2>
							<p>{content.body}</p>
							<p>{content.rating}</p>
						</div>
					</>
				))}
			</div>
		</>
	);
}
