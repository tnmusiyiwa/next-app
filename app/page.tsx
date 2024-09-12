import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/route";
import alfresco from "@/public/images/al-fresco-dining.jpg";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Image
        src="https://bit.ly/react-cover"
        alt="Al Fresco"
        fill
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={100}
      />
    </main>
  );
}
