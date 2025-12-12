export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        This page is fully static. It does not re-render on each request and will
        be output as plain HTML during build.
      </p>
    </div>
  );
}
