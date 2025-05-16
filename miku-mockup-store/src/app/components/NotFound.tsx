import Image from "next/image";

export default function NotFound() {
    return (
        <div className="py-10">
            <Image
                src={"/notfound.png"}
                width={700}
                height={600}
                alt="Not Found"
                className="border-r-4 border-teal-800"
            />
        </div>
    );
}