import { Suspense } from "react";
import SlowComponent from "./components/SlowComponent";

export default function Home() {
  return (
    <div> 


      <h1>Streaming Demo</h1>
      <Suspense fallback="Loading...">
        <SlowComponent />
      </Suspense>
    </div>
  );
}
