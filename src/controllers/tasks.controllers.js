import Task from '../models/task.models.js';

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.create({
    title,
    description,
    status,
    userId: req.user.id,
  });
  res.status(201).json({ task });
};

export const getTasks = async (req, res) => {
  const user = req.user;
  const tasks = await Task.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId'],
    },
    where: {
      userId: user.id,
    },
  });
  res.status(200).json({ tasks });
};

export const getTaskById = async (req, res) => {
  const user = req.user;
  const taskId = req.params.id;
  try {
    const task = await Task.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      where: {
        userId: user.id,
        id: taskId,
      },
    });
    res.status(200).json({ task });
  } catch {
    res.status(400).json({ message: "Task doesn't exists" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const updatedTask = await task.update({ title, description, status });

    res.status(201).json({ task: updatedTask });
  } catch {
    res.status(401).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.status(200).json(null);
  } catch {
    res.status(401).json({ message: 'Failed to delete task' });
  }
};
