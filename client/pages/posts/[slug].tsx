import slugify from "slugify";

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

export const getStaticPaths = async () => {
  const postsJSON = await fetch("http://localhost:3000/posts");
  const posts = await postsJSON.json();
  const postArr = posts.map((post: IPost) => {
    return {
      params: {
        slug: slugify(post._id),
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
  console.log(`Slug ----------------> ${params.slug}`);
  const postJSON = await fetch(`http://localhost:3000/posts/${params.slug}`);
  const post = await postJSON.json();
  return {
    props: { post },
  };
};

export default function Page({ post }: { post: IPost }) {
  return <p>Post: {post.post_name}</p>;
}
