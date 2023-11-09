import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import classes from "./PostDetails.module.css";
import { getAccessToken } from "../../services/jwt.service";
import jwtDecode from "jwt-decode";

function PostDetailsPage() {
  const [post, author] = useLoaderData();
  return (
    <>
      <Container>
        <div className={classes.postDetailsBox}>
          <div className={classes.postDescriptionBox}>
            <h1>{author.username}</h1>
            <h2>{post.title}</h2>
            <div className={classes.category}>{post.category}</div>
            <p>{post.content}</p>
          </div>
          <img src={post.image} className={classes.postImage}></img>
        </div>
        <div className={classes.footerButtons}>
          {footerButtons(post.id, post)}
        </div>
      </Container>
    </>
  );
}

function footerButtons(postId, post) {
  let token = getAccessToken();
  const decoded = jwtDecode(token);
  console.log(post)
  if (postId === decoded.id) {
    return (
      <>
        <Button variant="filled" size="md" radius="lg">
          <Link to="/posts">Back to Posts</Link>
        </Button><Button variant="filled" size="md" radius="lg">
          <Link to={`/posts/edit/${postId}`} state={{post: post}}>Edit Post</Link>
        </Button>
      </>
    );
  }
  else {
    return (
      <>
        <Button variant="filled" size="md" radius="lg">
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </>);
  }
}
export const postDetailsLoader = async ({ params }) => {
  const post = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  const author = await axios.get(`${DOMAIN}/api/users/${post.data.userId}`)
  return [post.data, author.data];
};

export default PostDetailsPage;
