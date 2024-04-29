const url = "http://localhost:8010";

export default class ApiService {
  urls = {
    text_detector: url + "/text-detection",
  };

  //? GET

  async get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("response statusCode : " + response.status);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  //? POST
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data), //carico i dati in formato json
      });

      if (!response.ok)
        throw new Error("response statusCode : " + response.status);
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async postFormData(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: data, //carico i dati in formato json
      });

      if (!response.ok)
        throw new Error("response statusCode : " + response.status);
      return await response.json();
    } catch (err) {
      console.error(err);
      return this.err(err);
    }
  }
}
