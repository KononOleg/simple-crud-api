const validationURL = (url) => {
  const separator = "/";
  const urlArray = url.split(separator);
  let isValidURL = false,
    id = null;
  if (urlArray[0] + urlArray[1] == "person" && urlArray.length <= 3) {
    isValidURL = true;
    id = urlArray[2];
  }
  return { isValidURL, id };
};

module.exports = { validationURL };
