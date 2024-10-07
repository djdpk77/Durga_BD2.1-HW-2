const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Define an object on the server: githubPublicData
let githubPublicData = {
  username: 'ankit123',
  fullName: 'Ankit Kumar',
  email: 'ankit@gmail.com',
  repositories: 24,
  gists: 12,
  joinedOn: 'Sep 2018',
};

//Function to return github profile URL
function getProfileUrl(githubPublicData) {
  return 'https://github.com/' + githubPublicData.username;
}

//Endpoint 1: Profile URL
app.get('/github-profile', (req, res) => {
  let profileUrl = getProfileUrl(githubPublicData);
  res.json({ profileUrl: profileUrl });
});

//Funcrion to return github email of user
function getPublicEmail(githubPublicData) {
  return githubPublicData.email;
}

//Endpoint 2: Public email
app.get('/github-public-email', (req, res) => {
  let publicEmail = getPublicEmail(githubPublicData);
  res.json({ publicEmail: publicEmail });
});

//Function to fetch number of repositories user has
function getReposCount(githubPublicData) {
  return githubPublicData.repositories;
}

//Endpoint 3: Get Repos Count
app.get('/github-repos-count', (req, res) => {
  let reposCount = getReposCount(githubPublicData);
  res.json({ reposCount: reposCount });
});

//Function to return the number of gists the user has
function getGistsCount(githubPublicData) {
  return githubPublicData.gists;
}

//Endpoint 4: Get Gists Count
app.get('/github-gists-count', (req, res) => {
  let gistsCount = getGistsCount(githubPublicData);
  res.json({ gistsCount: gistsCount });
});

//Function to return the user's bio
function getUserBio(githubPublicData) {
  return {
    fullName: githubPublicData.fullName,
    joinedOn: githubPublicData.joinedOn,
    email: githubPublicData.email,
  };
}

//Endpoint 5: Get User Bio
app.get('/github-user-bio', (req, res) => {
  let userBio = getUserBio(githubPublicData);
  res.json(userBio);
});

//Function to return the URL of a specific repository
function getRepoUrl(githubPublicData, repoName) {
  return 'https://github.com/' + githubPublicData.username + '/' + repoName;
}

//Endpoint 6: Repository URL
app.get('/github-repo-url', (req, res) => {
  let repoName = req.query.repoName;
  let repoUrl = getRepoUrl(githubPublicData, repoName);
  res.json({ repoUrl: repoUrl });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
