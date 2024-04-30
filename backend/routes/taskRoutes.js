const express = require("express");
const { TaskModel } = require("../models/taskModel");

const router = express.Router();

router.get("/", async(req, res) => {
    // const userId = req.params.userId;
    const tasks = await TaskModel.find();
    res.send({ "Tasks": tasks });
})

router.get("/:taskID", async(req, res) => {
    // const userId = req.params.userId;
    const taskId = req.params.taskID;
    const task = await TaskModel.find({ _id: taskId });
    res.send({ "Task": task });
})

router.post("/create", async(req, res) => {
    const { id, title, description, status } = req.body;
    const user_id = req.userId;
    const tasks = await TaskModel.create({ id, title, description, status, user_id });
    res.send("Task created !!");
})

router.patch("/:taskID", async(req, res) => {
    const taskId = req.params.taskID;
    const payload = req.body;
    const user_id = req.userId;
    try {
        const task = await TaskModel.findOne({ _id: taskId });

        if (task.user_id === user_id) {
            await TaskModel.findByIdAndUpdate(taskId, payload);
            res.send("Task Updated");
        } else {
            res.status(404).send({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/:taskID", async(req, res) => {
    const taskId = req.params.taskID;
    const user_id = req.userId;
    try {
        const task = await TaskModel.findOne({ _id: taskId });

        if (task) {
            if (task.user_id === user_id) {
                await TaskModel.findByIdAndDelete(taskId);
                res.send({ message: "Task Deleted" });
            } else {
                res.send({ message: "Task not found" })
                    // res.status(404).send({ message: "Task not found" });
            }

        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error", error);
    }
});

module.exports = { router };