import express from "express";

import { Router } from "express";

const app = express();

const route = Router();

app.use(express.json());

app.use(route);

app.listen(3333, () => "server running on port 3333");
