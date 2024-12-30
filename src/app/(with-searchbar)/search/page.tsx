import BookItem from "@/components/book-item";
import ListBookItemSkeleton from "@/components/skeleton/list-book-item-skeleton";
import type { BookData } from "@/types";
import delay from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const books: BookData[] = await response.json();

    if (books.length === 0) {
      return <div>검색결과가 없습니다.</div>
    }

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const params = await searchParams; // Promise 처리
  return (
    // suspense로 감싸 streaming 가능해짐
    <Suspense key={params.q || ""} fallback={<ListBookItemSkeleton count={3}/>}>  
      <SearchResult q={params.q || ""} />
    </Suspense>
  );
}
