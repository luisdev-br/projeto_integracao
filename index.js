const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema');



const app = express();


connectDB();


app.use(bodyParser.json());


app.use("/api/auth", authRoutes);


app.use("/api/tasks", taskRoutes);


app.use("/api/projects", projectRoutes);


app.use("/api/profiles", profileRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true 
}));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});