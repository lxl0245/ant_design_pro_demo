function chart(http_method) {
  let res = null;
  switch (http_method) {
    case "GET":
      res = [50, 20, 30, 40, 50, 60];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
