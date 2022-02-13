[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5cbef15a4f2d40afbebfa006c12fb385)](https://www.codacy.com/gh/elijah-kurganskiy/family-tree-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=elijah-kurganskiy/family-tree-api&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/5cbef15a4f2d40afbebfa006c12fb385)](https://www.codacy.com/gh/elijah-kurganskiy/family-tree-api/dashboard?utm_source=github.com&utm_medium=referral&utm_content=elijah-kurganskiy/family-tree-api&utm_campaign=Badge_Coverage)
# Family Tree API

## Features

- :rocket: Code-First [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- :rocket: JWT authentication [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- :rocket: REST API docs [Swagger](https://swagger.io/)
- :rocket: Prettier and ESlint to static analyze a code
- :boat: Docker

## Overview

- [Family Tree API](#family-tree-api)
  - [Features](#features)
  - [Overview](#overview)
  - [Development](#development)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2. Install Docker](#2-install-docker)
    - [3. Configure environment](#3-configure-environment)
    - [4. Start NestJS Server](#4-start-nestjs-server)

## Development

### 1. Install Dependencies

Install [Nestjs CLI](https://docs.nestjs.com/cli/usages) to start and [generate CRUD resources](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute)

```bash
npm i -g @nestjs/cli
```

Install the dependencies for the Nest application:

```bash
npm install
```

### 2. Install Docker

Use Docker and Docker-compose to develop the application in an isolated environment

[Link](https://docs.docker.com/engine/install/ubuntu/) to install instructions

### 3. Configure environment

We need to create `.env` file to configure server
```
cp .env.example .env
```

### 4. Start NestJS Server

```
npm run docker:dev
```

GraphQL Playground for the NestJS Server is available here: http://localhost:3000/graphql  
Swagger for the NestJS Server is available here: http://localhost:3000/api  


**[⬆ back to top](#overview)**

