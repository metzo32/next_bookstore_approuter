import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

function Loading() {
  return <div>Loading...</div>;
}

export default function Layout({ children }: { children: ReactNode }) {


  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
