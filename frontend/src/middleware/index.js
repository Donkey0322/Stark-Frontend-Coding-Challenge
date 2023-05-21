import instance from "./axios";

export const getLaunch = async (page = 1, filter = {}, id = undefined) => {
  const { name, start, end, status = "all", sort = -1 } = filter;
  let query = {
    details: { $ne: null },
  };
  if (status !== "all") {
    query = { ...query, success: status ? true : null };
  }
  if (name) {
    query = {
      ...query,
      name: {
        $regex: name,
        $options: "si",
      },
    };
  }
  let date_utc = {};
  if (start) {
    date_utc = {
      ...date_utc,
      $gte: new Date(start),
    };
  }
  if (end) {
    date_utc = {
      ...date_utc,
      $lte: new Date(end),
    };
  }
  if (Object.keys(date_utc).length) {
    query = {
      ...query,
      date_utc,
    };
  }

  const data = {
    query,
    options: {
      page,
      sort: { date_utc: sort },
      limit: 12,
      select: { name: 1, links: 1, date_utc: 1, details: 1 },
    },
  };
  try {
    console.log("GET", "/v5/launches", "req", filter, id);
    if (id) {
      const { data: result } = await instance.get(`/v5/launches/${id}`, data);
      console.log("GET", "/v5/launches", "res", result);
      return result;
    }
    const { data: result } = await instance.post("/v5/launches/query", data);
    console.log("GET", "/v5/launches", "res", result);
    return result;
    // const { data: result } = await instance.get("/v4/launches/latest");
  } catch (error) {
    throw error;
  }
};
