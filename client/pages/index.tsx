import Link from "next/link";

interface IPost {
  _id: string;
  post_name: string;
  post_content: string;
  timestamp: Date;
  author: {
    _id: string;
    username: string;
    password: string;
  };
}

function formatContent(content: string, len: number = 10): string {
  if (content.length > len) {
    return `${content.slice(0, len - 3)}...`;
  }
  return content;
}

export const getStaticProps = async () => {
  const postsJSON = await fetch(`http://localhost:3000/posts`);
  const posts = await postsJSON.json();
  return {
    props: { posts },
  };
};

export default function Home({ posts }: { posts: IPost[] }) {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="font-bold px-2 py-4 text-2xl text-center">Hello</h1>
      <div className="flex justify-center items-center flex-col flex-1">
        <h2 className="font-bold text-xl pb-4">Posts</h2>
        <ul className="list-none">
          {posts.map((post) => {
            return (
              <li key={post._id} className="pb-2">
                <div>
                  <Link
                    href={`posts/${post._id}`}
                    className="font-bold underline"
                  >
                    {post.post_name}
                  </Link>
                  <p className="font-light px-2">
                    {formatContent(post.post_content)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
