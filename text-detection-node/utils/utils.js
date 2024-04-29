export function queryString(query) {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  return queryString;
}

export const err = (err) => {
  return {
    success: false,
    data: [],
    err: err,
  };
};

export const succ = (res) => {
  return {
    success: true,
    data: res,
  };
};

export const wrapper = async (callback) => {
  try {
    return await callback();
  } catch (err) {
    console.error(err);
    return false;
  }
};
