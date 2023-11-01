import Link from "next/link";
import dayjs from "dayjs";
import { IPost } from "@/types";

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
    <div className="flex flex-col min-h-screen p-2">
      <div className="flex-1">
        <h1 className="font-bold text-2xl">{post.post_name}</h1>
        <p className="font-light">
          {dayjs(post.timestamp).format("DD/MM/YYYY")}
        </p>
        <p>
          Author: <span className="font-light">{post.author.username}</span>
        </p>
        <p>{post.post_content}</p>
      </div>
      <footer>
        <Link href={"/"} className="underline text-center">
          Go back.
        </Link>
      </footer>
    </div>
  );
}
