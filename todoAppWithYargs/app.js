const path = require("path");
const fs = require("fs");
const yargs = require("yargs");
const TasksFile = path.join(__dirname, "tasks.json");

function ensureTasksFileExists(){
  if (!fs.existsSync(TasksFile)){
    fs.writeFileSync(TasksFile, "[]");
  }
}

function loadTasks() {
  ensureTasksFileExists();
  try {
    const dataBuffer = fs.readFileSync(TasksFile);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
}
function saveTasks(tasks) {

  try{
  const dataJSON = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(TasksFile, dataJSON);
}catch (error) {
  console.error("Error: Could not save task.");
}
}

yargs.command({
  command: "add",
  describe: "Add a new task",
  builder: {
    title: {
      describe: "Task title",
      demandOption: true,
      type: "string",
    },
    notes: {
      describe: "Task notes",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const tasks = loadTasks();

    tasks.push({
      title: argv.title,
      notes: argv.notes,
    });

    saveTasks(tasks);
    console.log("Task saved successfully");
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a task from list",
  builder: {
    title: {
      describe: "title of task to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const tasks = loadTasks();
    const tasksToKeep = tasks.filter((task) => task.title !== argv.title);
    saveTasks(tasksToKeep);
    if(tasksToKeep.length < tasks.length){
      console.log("Task Removed");
    }
    else {
      console.log("Error: Task not found");
    }
  },
});

yargs.command({
  command: "list",
  describe: "displays the list of tasks",
  builder: {},
  handler() {
    const tasks = loadTasks();
    for (i = 0; i < tasks.length; ++i) {
      console.log(tasks[i].title);
    }
  },
});

yargs.command({
  command: "read",
  describe: "displays the notes of a specific task",
  builder: {
    title: {
      describe: "title of task",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const tasks = loadTasks();
    const foundTask = tasks.find((task) => task.title === argv.title);

    if (foundTask) {
      console.log(foundTask.title);
      console.log(foundTask.notes);
    } else {
      console.log("Error: Task does not exist");
    }
  },
});
yargs.parse();
