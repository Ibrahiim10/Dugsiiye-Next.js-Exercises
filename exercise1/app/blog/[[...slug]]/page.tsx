interface Props {
  params: {
    slug?: string[];
  };
}

export default function BlogPage({ params }: Props) {
  const path = params.slug ? params.slug.join("/") : "";
  return <h1>You visited: /{path}</h1>;
}
