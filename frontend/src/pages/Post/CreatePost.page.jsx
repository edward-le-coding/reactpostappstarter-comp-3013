import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";

function CreatePostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit/");
  const post = useLoaderData();
  console.log(post);
  const form = useForm({
    initialValues: {
      title: isEdit? post.title: "",
      category: isEdit? post.category: "",
      image: isEdit? post.image: "",
      content: isEdit? post.content: "",
    },
  });
  const handleSubmit = async (values) => {
    let endpoint = "";
    if (!isEdit){ 
      endpoint = `${DOMAIN}/api/posts`;
      const res = await axios.post(endpoint, values);
      if (res?.data.success) {
        navigate("/posts");
      }
    } else {
      const id = location.pathname.split("/edit/")[1];
      endpoint = `${DOMAIN}/api/posts/edit/${id}`
      const res = await axios.post(endpoint, values);
      if (res?.data.success) {
        navigate(`/posts/${id}`);
      }
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export const editPostDetailsLoader = async ({ params }) => {
  const post = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return post.data;
};


export default CreatePostPage;
