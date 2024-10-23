import { Title } from "@/components";
import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
	return (
		<div className="">
			<Title title="Tienda" subTitle="Todos lo productos" className="mb-2" />
		</div>
	);
}
