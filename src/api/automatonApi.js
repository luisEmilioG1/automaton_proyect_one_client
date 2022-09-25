export async function load(bodyForm) {
  const options = {
    method: "POST",
    body: bodyForm,
  };

  const response = await fetch("http://127.0.0.1:5000/load", options);

  const responseJson = await response.json();

  return responseJson;
}

export async function union(bodyForm) {
  const options = {
    method: "POST",
    body: bodyForm,
  };

  const response = await fetch("http://127.0.0.1:5000/union", options);
  const responseJson = await response.json();

  return responseJson;
}

export async function complement(bodyForm) {
  const options = {
    method: "POST",
    body: bodyForm,
  }

  const response = await fetch("http://127.0.0.1:5000/complement", options)
  const responseJson = await response.json()

  return responseJson
}

export async function reverse(bodyForm) {
  const options = {
    method: "POST",
    body: bodyForm,
  }

  const response = await fetch("http://127.0.0.1:5000/reverse", options)
  const responseJson = await response.json()

  return responseJson
}
