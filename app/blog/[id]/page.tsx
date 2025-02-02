import { Metadata } from "next";
import { getAllPosts } from '../page'

async function getPostById(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return response.json();
}

type Props = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: {id: string}) => ({
    slug: post.id.toString(),

  }));

}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const post = await getPostById(id);
  return {
    title: post.title,
  };
}
export default async function Post({ params: { id } }: Props) {
  const post = await getPostById(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
}
