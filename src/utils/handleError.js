export default function handleError(error) {
  if (error.response) {
    return error.response.data?.message || "Server error.";
  } else if (error.request) {
    return "No response from server.";
  } else {
    return error.message || "Something went wrong.";
  }
}
