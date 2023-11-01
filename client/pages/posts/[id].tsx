import Link from "next/link";

interface IPost {
  _id: string;
  post_name: string;
  post_content: string;
  timestamp: string;
  author: {
    _id: string;
    username: string;
    password: string;
  };
}

export const getStaticPaths = async () => {
  const postsJSON = await fetch("http://localhost:3000/posts");
  const posts = await postsJSON.json();
  const postArr = posts.map((post: IPost) => {
    return {
      params: {
        id: post._id,
      },
    };
  });
  return {
    paths: [...postArr],
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const postJSON = await fetch(`http://localhost:3000/posts/${params.id}`);
  const post = await postJSON.json();
  return {
    props: { post },
  };
};

export default function Page({ post }: { post: IPost }) {
  return (
    <>
      <h1 className="font-bold text-2xl">Post: {post.post_name}</h1>
      <p>{post.timestamp}</p>
      <p>Author: {post.author.username}</p>
      <p>{post.post_content}</p>
      <Link href={"/"}>Go back.</Link>
    </>
  );
}
