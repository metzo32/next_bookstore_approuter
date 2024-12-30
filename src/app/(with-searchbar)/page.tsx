import BookItem from "@/components/book-item";
import type { BookData } from "@/types";
import style from "./page.module.css";
import { Suspense } from "react";
import ListBookItemSkeleton from "@/components/skeleton/list-book-item-skeleton";
import delay from "@/util/delay";

// export const dynamic = ""

async function AllBooks() {

  await delay(2000); // 1.5초 후 처리

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  // const contentType = response.headers.get('content-type');
  // console.log(contentType)
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

async function RecoBooks() {
  await delay(1500); 

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 페이지를 다이나믹하게 바꾸는 데에 관여하지 않음
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const randomBooks: BookData[] = await response.json();

  return (
    <>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<ListBookItemSkeleton count={3}/>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<ListBookItemSkeleton count={5}/>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
