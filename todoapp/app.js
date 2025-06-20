const command = process.argv[2];
const newTaskTitle = process.argv[3]

const fs = require('fs');
const readline = require('readline');

const r1 = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

function loadTasks(){
    try{
        const dataBuffer = fs.readFileSync('tasks.json');
        const dataJSON = dataBuffer.toString();
            return JSON.parse(dataJSON);
    }catch(error){
        return [];
    }
    
}
function saveTasks(tasks){
const dataJSON = JSON.stringify(tasks, null, 2);
fs.writeFileSync('tasks.json', dataJSON);
}
const tasks = loadTasks();


if (command === "add"){
    r1.question("Enter notes for this task: ", function(notes){
    tasks.push({title: newTaskTitle, body: notes});
    saveTasks(tasks);
    console.log(`Added task: ${newTaskTitle} `)
    r1.close();
});
}

else if (command === "remove"){
    r1.question("What task would you like to remove? ", function(userInput){
        const taskToRemove = tasks.findIndex(task=> task.title === userInput);
        
        if(taskToRemove !== -1){
            const removed = tasks[taskToRemove]
            tasks.splice(taskToRemove, 1)            
            console.log(`${removed.title} successfully removed`)
            saveTasks(tasks);
        }else {
            console.log("Invalid: task does not exist")
        }
        r1.close();

});
}
else if (command === "list"){for (let i=0; i<tasks.length;i++) {
    console.log( "Task " + ([i+1]) + ": " +  tasks[i].title );}
}

else if (command === "read"){
    r1.question("What task would you like to read? ", function(userInput){
        const foundTask = tasks.find(task => task.title === userInput);
            if(foundTask){
                console.log(`\nTitle: ${foundTask.title}`)
                console.log(`\nNotes: ${foundTask.body}`)
            }  
            else{
                console.log("Task not found");
            } 
        r1.close();  
    });
}


/*console.log(tasks);
console.log("number of tasks:", tasks.length);*/

