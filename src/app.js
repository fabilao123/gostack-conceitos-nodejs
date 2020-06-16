const express = require("express");
const { uuid } = require('uuidv4');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id : uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);

  return response.status(200).send(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Not Found' });
  }

  const repositorie = {
    id : id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }; 
  
  repositories[repositoryIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Not Found' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Not Found' });
  }

  const repositorie = {...repositories[repositoryIndex], likes : ++repositories[repositoryIndex].likes };
  
  repositories[repositoryIndex] = repositorie;  
  
  return response.json(repositorie);
});

module.exports = app;
