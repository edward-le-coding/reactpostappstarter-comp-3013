import DOMAIN from "../../services/endpoint";
import axios from "axios";

function PostDetailsPage() {
  return (
    <>
      <p>This page shows post details!</p>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  return null;
};

export default PostDetailsPage;
