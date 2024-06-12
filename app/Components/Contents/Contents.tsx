"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import db from "../Firebase";

type Content = {
	id: string;
	title: string;
	body: string;
	rating: number;
};

export const Contents: NextPage = () => {
	const [blogContents, setBlogContents] = useState<Content[]>([]);

	useEffect(() => {
		fetchContents();
		console.log(process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APIKEY as string);
	}, []);
	const fetchContents = async () => {
		try {
			const contentsCollectionRef = collection(db, "user1");
			const querySnapShot = await getDocs(contentsCollectionRef);
			const contentsData: Content[] = [];
			querySnapShot.forEach((doc) => {
				contentsData.push(doc.data() as Content);
			});
			setBlogContents(contentsData);
		} catch (e) {
			console.log("Error featching contents", e);
		}
	};
	return (
		<>
			<div>
				<h1>Content</h1>
				{blogContents.map((content) => (
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
};
