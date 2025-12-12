interface Props {
  params: {
    username: string;
  };
}

export default function UserPage({ params }: Props) {
  return <h1>Welcome, {params.username}</h1>;
}
