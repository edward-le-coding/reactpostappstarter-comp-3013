import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

function PostDetailsPage() {
  const [post, author] = useLoaderData();
  console.log(author);
  console.log(post);
  return (
    <>
      <Container>
        <div>
          <h1>{author.username}</h1>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
        <div>
          <img src={post.image}></img>
        </div>
        <Button variant="filled" size="md" radius="lg">
          <Link to="/posts">Back to Posts</Link>
        </Button>
        <Button variant="filled" size="md" radius="lg">
          <Link to="/posts/create">Edit Post</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const post = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  const author = await axios.get(`${DOMAIN}/api/users/${post.data.userId}`)
  return [post.data, author.data];
};

export default PostDetailsPage;
