import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Loader } from "@mantine/core";
import { Await, defer, useLoaderData } from "react-router-dom";
import React from "react";

export const PostPage = () => {
  const posts = useLoaderData();
  return (
    <Container>
      <React.Suspense fallback={<Loader color="blue" m="50%"/>}>
        <SimpleGrid cols={3}>
          <Await resolve={posts.res}>
            {(res) => res.data.map((post) => (
              <ArticleCardImage key={post.title} {...post} />
            ))}
          </Await>
        </SimpleGrid>
      </React.Suspense>
    </Container >
  );
};

export const postsLoader = async () => {
  const res = axios.get(`${DOMAIN}/api/posts`);
  return defer({ res });
};
