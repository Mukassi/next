import { Metadata } from "next";
import Link from "next/link";

export async function getAllPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if(!response.ok) throw new Error("Unable to fetch posts!")
  return response.json();
}

export const metadata: Metadata = {
  title: "Blog | Next App",
};

export const revalidate = 10;

export default async function Blog() {
  const posts = await getAllPosts();
  return (
    <>
      <h1>Blog page</h1>
      <ul>
        {posts.map((post: any) => {
          return (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
