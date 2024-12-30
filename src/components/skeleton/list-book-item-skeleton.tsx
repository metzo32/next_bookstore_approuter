import BookItemSkeleton from "./book-item-skeleton";

export default function ListBookItemSkeleton({ count }: { count: number }) {
    return (
      <>
        {new Array(count).fill(null).map((_, idx) => (
          <BookItemSkeleton key={`skeleton-${idx}`} />
        ))}
      </>
    );
  }
  