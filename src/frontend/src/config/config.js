const config = {
  dev: {
    // server: "http://192.168.1.32:3000",
    // server: "http://localhost:3000",
    server: "https://aqueous-dusk-20175.herokuapp.com",
  },
  prod: {
    server: "https://aqueous-dusk-20175.herokuapp.com",
  },
};
export default process.env.NODE_ENV === "production" ? config.prod : config.dev;
