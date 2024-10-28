import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="flex w-full justify-center text-xs mb-10">
			<Link href={"/"}>
				<span className={`${titleFont.className} antialiased font-bold`}>
					Tesla
				</span>
				<span> | shop </span>
				<span>&#169; {new Date().getFullYear()}</span>
			</Link>

			<Link href={"#"} className="mx-3">
				Privacidad & legal
			</Link>
			<Link href={"#"} className="mx-3">
				Ubicaciones
			</Link>
		</div>
	);
};
