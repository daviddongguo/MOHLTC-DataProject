const config = {
  dev: {
    // server: "http://localhost:3000",
    server: "https://aqueous-dusk-20175.herokuapp.com",
  },
  prod: {
    server:
      process.env.SERVER_URL || "https://aqueous-dusk-20175.herokuapp.com",
  },
};
export default process.env.NODE_ENV === "production" ? config.prod : config.dev;
