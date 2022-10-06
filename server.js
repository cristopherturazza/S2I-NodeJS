const app = require("./app");
const { connectDB, disconnectDB } = require("./database");

connectDB();

app.listen(3000, () => console.log("Server is listening on port 3000"));
