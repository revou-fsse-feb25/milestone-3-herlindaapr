import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-row w-full py-2">
            <p className="mx-auto">&copy; 2025 Made by Herlinda </p>
            <Link
                href={"/FAQ"}
                className="text-teal-800 flex hover:underline hover:cursor-pointer hover:font-bold mx-4 font-semibold">
                FAQ
            </Link>
        </footer>
  );
}