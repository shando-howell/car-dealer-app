import { routes } from "@/config/route";
import Image from "next/image";
import Link from "next/link";

export const PublicHeader = () => {
    return (
        <header className="flex items-center justify-between h-16 px-4 bg-transparent gap-x-6">
            <div className="flex items-center flex-1">
                <Link href={routes.home} className="flex items-center gap-2">
                    <Image
                        width={300}
                        height={100}
                        alt="logo"
                        className="relative"
                        src="/logo.svg"
                    />
                </Link>
            </div>
            <nav>
                <Link
                    className="group font-heading rounded px-3 py-2 text-base text-foreground
                    hover:text-primary duration-300 transition-all ease-in-out font-semibold
                    uppercase"
                    href={routes.home}
                >
                    Home
                </Link>
            </nav>
        </header>
    )
}