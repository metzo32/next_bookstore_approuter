import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import type { BookData } from "@/types";

async function RenderFooter() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  const books: BookData[] = await response.json();
  const numberOfBooks = books.length;

  if (!response || numberOfBooks === undefined) {
    return <footer>제작 @SEYEON.OH</footer>;
  }

  return (
    <footer>
      <div>제작 @SEYEON.OH</div>
      <div>{numberOfBooks}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <RenderFooter />
        </div>
      </body>
    </html>
  );
}
