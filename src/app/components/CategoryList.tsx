import Image from "next/image";
import Link from "next/link";

const category = [
  { id: 1, name: "HTML", src: "/assets/images/category/1.svg", href: "/questions?categoryId=1" },
  { id: 2, name: "CSS", src: "/assets/images/category/2.svg", href: "/questions?categoryId=2" },
  {
    id: 3,
    name: "JavaScript",
    src: "/assets/images/category/3.svg",
    href: "/questions?categoryId=3",
  },
  {
    id: 4,
    name: "TypeScript",
    src: "/assets/images/category/4.svg",
    href: "/questions?categoryId=4",
  },
  { id: 5, name: "React", src: "/assets/images/category/5.svg", href: "/questions?categoryId=5" },
  { id: 6, name: "Next", src: "/assets/images/category/6.svg", href: "/questions?categoryId=6" },
];

export default function CategoryList() {
  return (
    <section className="flex justify-center gap-1.5 mt-[var(--space-40)] mb-[60px]">
      {category.map((item) => (
        <Link key={item.id} href={item.href} className="flex flex-col items-center gap-2 w-[135px]">
          <Image
            src={item.src}
            alt={item.name}
            width={36}
            height={36}
            className="max-w-[var(--text-48)] md:w-[var(--text-48)] md:h-[var(--text-48)]"
          />
          <p className="txt-sm">{item.name}</p>
        </Link>
      ))}
    </section>
  );
}
