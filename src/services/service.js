// Define the URL with parameters
const apiUrl =
  "https://api.github.com/search/issues?q=repo:apple/swift is:pr is:merged created:";
// as there only 1 request, we can leave it here
const token = "your_token_here"; // put your generated token as variable
// Define the headers
const headers = {
  Accept: "application/vnd.github.v3+json",
};

// Make the GET request
export default function getData(date) {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.github.v3+json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${apiUrl}${date}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result?.total_count;
    })
    .catch((error) => console.error("error", error));
}
