import express from "express";
import handleRequest from "../middlewares/react_routes_handler.js";

const default_router = express();

default_router.use(handleRequest);

default_router.get("/", handleRequest);
default_router.get("/finance", handleRequest);
default_router.get("/philosophy", handleRequest);
default_router.get("/science", handleRequest);
default_router.get("/tech", handleRequest);
default_router.get("/art", handleRequest);
default_router.get("/politics", handleRequest);
default_router.get("/sign_up", handleRequest);
default_router.get("/user_profile", handleRequest);
default_router.get("/log_in", handleRequest);
default_router.get("/log_out", handleRequest);

export default default_router;