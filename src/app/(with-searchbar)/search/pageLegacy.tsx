import BookItem from "@/components/book-item";
import type { BookData } from "@/types";
import delay from "@/util/delay";


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams; // Promise 처리

  await delay(1500)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${params.q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}