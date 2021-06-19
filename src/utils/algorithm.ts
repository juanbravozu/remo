const profiles = [
    [{hour: 4, value: 1}, {hour: 4.5, value: 1}, {hour: 5, value: 2}, {hour: 5.5, value: 2}, {hour: 6, value: 3}, {hour: 6, value: 3}, {hour: 7, value: 4}, {hour: 7.5, value: 4}, {hour: 8, value: 5}, {hour: 8.5, value: 5}, {hour: 9, value: 5}, {hour: 9.5, value: 5}, {hour: 10, value: 4}, {hour: 10.5, value: 4}, {hour: 11, value: 4}, {hour: 11.5, value: 4}, {hour: 12, value: 4}, {hour: 12.5, value: 4}, {hour: 13, value: 3}, {hour: 13.5, value: 3}, {hour: 14, value: 3}, {hour: 14.5, value: 3}, {hour: 15, value: 3}, {hour: 15.5, value: 3}, {hour: 16, value: 2}, {hour: 16.5, value: 2}, {hour: 17, value: 2}, {hour: 17.5, value: 2}, {hour: 18, value: 2}, {hour: 18.5, value: 2}, {hour: 19, value: 2}, {hour: 19.5, value: 2}, {hour: 20, value: 1}, {hour: 20.5, value: 1}, {hour: 21, value: 1}, {hour: 21.5, value: 1}, {hour: 22, value: 1}, {hour: 22.5, value: 1}, {hour: 23, value: 1}, {hour: 23.5, value: 1}],
    [{hour: 4, value: 1}, {hour: 4.5, value: 1}, {hour: 5, value: 1}, {hour: 5.5, value: 1}, {hour: 6, value: 1}, {hour: 6, value: 1}, {hour: 7, value: 2}, {hour: 7.5, value: 2}, {hour: 8, value: 2}, {hour: 8.5, value: 2}, {hour: 9, value: 3}, {hour: 9.5, value: 3}, {hour: 10, value: 4}, {hour: 10.5, value: 4}, {hour: 11, value: 5}, {hour: 11.5, value: 5}, {hour: 12, value: 5}, {hour: 12.5, value: 5}, {hour: 13, value: 4}, {hour: 13.5, value: 4}, {hour: 14, value: 4}, {hour: 14.5, value: 4}, {hour: 15, value: 5}, {hour: 15.5, value: 5}, {hour: 16, value: 4}, {hour: 16.5, value: 4}, {hour: 17, value: 3}, {hour: 17.5, value: 3}, {hour: 18, value: 2}, {hour: 18.5, value: 2}, {hour: 19, value: 2}, {hour: 19.5, value: 2}, {hour: 20, value: 1}, {hour: 20.5, value: 1}, {hour: 21, value: 1}, {hour: 21.5, value: 1}, {hour: 22, value: 1}, {hour: 22.5, value: 1}, {hour: 23, value: 1}, {hour: 23.5, value: 1}],
    [{hour: 4, value: 1}, {hour: 4.5, value: 1}, {hour: 5, value: 1}, {hour: 5.5, value: 1}, {hour: 6, value: 1}, {hour: 6, value: 1}, {hour: 7, value: 1}, {hour: 7.5, value: 1}, {hour: 8, value: 2}, 
        {hour: 8.5, value: 2}, {hour: 9, value: 2}, {hour: 9.5, value: 2}, {hour: 10, value: 2}, {hour: 10.5, value: 2}, {hour: 11, value: 3}, {hour: 11.5, value: 3}, {hour: 12, value: 3}, {hour: 12.5, value: 3}, 
        {hour: 13, value: 3}, {hour: 13.5, value: 3}, {hour: 14, value: 4}, {hour: 14.5, value: 4}, {hour: 15, value: 5}, {hour: 15.5, value: 5}, {hour: 16, value: 5}, {hour: 16.5, value: 5}, {hour: 17, value: 5}, 
        {hour: 17.5, value: 5}, {hour: 18, value: 4}, {hour: 18.5, value: 4}, {hour: 19, value: 4}, {hour: 19.5, value: 4}, {hour: 20, value: 3}, {hour: 20.5, value: 3}, {hour: 21, value: 2}, {hour: 21.5, value: 2}, 
        {hour: 22, value: 1}, {hour: 22.5, value: 1}, {hour: 23, value: 1}, {hour: 23.5, value: 1}],
    [{hour: 4, value: 1}, {hour: 4.5, value: 1}, {hour: 5, value: 1}, {hour: 5.5, value: 1}, {hour: 6, value: 1}, {hour: 6, value: 1}, {hour: 7, value: 1}, {hour: 7.5, value: 1}, {hour: 8, value: 1}, 
        {hour: 8.5, value: 1}, {hour: 9, value: 2}, {hour: 9.5, value: 2}, {hour: 10, value: 2}, {hour: 10.5, value: 2}, {hour: 11, value: 2}, {hour: 11.5, value: 2}, {hour: 12, value: 3}, {hour: 12.5, value: 3}, 
        {hour: 13, value: 3}, {hour: 13.5, value: 3}, {hour: 14, value: 3}, {hour: 14.5, value: 3}, {hour: 15, value: 4}, {hour: 15.5, value: 4}, {hour: 16, value: 5}, {hour: 16.5, value: 5}, {hour: 17, value: 5}, 
        {hour: 17.5, value: 5}, {hour: 18, value: 5}, {hour: 18.5, value: 5}, {hour: 19, value: 4}, {hour: 19.5, value: 4}, {hour: 20, value: 4}, {hour: 20.5, value: 4}, {hour: 21, value: 3}, {hour: 21.5, value: 3}, 
        {hour: 22, value: 2}, {hour: 22.5, value: 2}, {hour: 23, value: 1}, {hour: 23.5, value: 1}],
    [{hour: 4, value: 1}, {hour: 4.5, value: 1}, {hour: 5, value: 1}, {hour: 5.5, value: 1}, {hour: 6, value: 1}, {hour: 6, value: 1}, {hour: 7, value: 1}, {hour: 7.5, value: 1}, {hour: 8, value: 1}, 
        {hour: 8.5, value: 1}, {hour: 9, value: 1}, {hour: 9.5, value: 1}, {hour: 10, value: 2}, {hour: 10.5, value: 2}, {hour: 11, value: 2}, {hour: 11.5, value: 2}, {hour: 12, value: 2}, {hour: 12.5, value: 2}, 
        {hour: 13, value: 2}, {hour: 13.5, value: 2}, {hour: 14, value: 3}, {hour: 14.5, value: 3}, {hour: 15, value: 3}, {hour: 15.5, value: 3}, {hour: 16, value: 3}, {hour: 16.5, value: 3}, {hour: 17, value: 4}, 
        {hour: 17.5, value: 4}, {hour: 18, value: 5}, {hour: 18.5, value: 5}, {hour: 19, value: 5}, {hour: 19.5, value: 5}, {hour: 20, value: 5}, {hour: 20.5, value: 5}, {hour: 21, value: 4}, {hour: 21.5, value: 4}, 
        {hour: 22, value: 3}, {hour: 22.5, value: 3}, {hour: 23, value: 1}, {hour: 23.5, value: 1}],
]

interface ISchedule {
    day: number,
    start: number,
    end: number
}

interface IDeadline {
    nanoseconds: number,
    seconds: number
}

interface ITask {
    name: string,
    deadline: IDeadline,
    assigned: number,
    duration: number,
    id: string,
    manual: boolean,
    weekend: boolean,
    difficulty: number,
    schedule: Array<ISchedule>
}

function limitNumber(n:number, limit:number) {
    return  n > limit ? limit : n;
}

function filterAssignedTasks(tasks:Array<ITask>) {
    const manualTasks = tasks.filter(task => task.manual);
    const recommendTasks = tasks.filter(task => !task.manual);
    return [ manualTasks, recommendTasks ];
}

function filterAndSortTasks(tasks:Array<ITask>) {
    const [ manualTasks, recommendTasks ] = filterAssignedTasks(tasks);

    recommendTasks.sort((a, b) => {
        const dateA = new Date(a.deadline.seconds*1000);
        const dateB = new Date(b.deadline.seconds*1000);

        if(dateA < dateB) {
            return -1
        } else if(dateA > dateB) {
            return 1
        } 
        return 0
    });

    return [ ...recommendTasks, ...manualTasks ];
}

function iterateProd(prodArray:Array<any>, task:ITask, user:any, tasks:Array<ITask>) {
    for(let day = new Date(); day.getDate() < new Date(task.deadline.seconds*1000).getDate(); day.setDate(day.getDate() + 1)) {

        let minHour = null;
        if(day.getDate() === new Date().getDate()) minHour = new Date().getHours();
        for(let i = 0; i < prodArray.length; i++) {

            if((minHour && prodArray[i].hour > minHour) || minHour === null) {
                day.setHours(prodArray[i].hour, (prodArray[i].hour - Math.floor(prodArray[i].hour)) * 60, 0, 0);

                let available = true;

                if(day.getDay() === 0 || (day.getDay() === 6 && !task.weekend)) available = false;

                if(available && user.workday[0] <= prodArray[i].hour && user.workday[1] >= prodArray[i].hour + limitNumber(prodArray[i].hour, 2) && 
                !(user.lunch <= prodArray[i].hour && user.nap >= prodArray[i].hour)) {
                    for(let j = 0; j < tasks.length; j++) {
                        const compareTask = tasks[j];
                        for(let k = 0; k < compareTask.schedule.length; k++) {
                            const schedule = compareTask.schedule[k];
                            if(new Date(schedule.day).getDate() === day.getDate() && ((schedule.start >= prodArray[i].hour && schedule.end <= prodArray[i].hour) || (schedule.start >= prodArray[i].hour + limitNumber(task.duration, 2) && schedule.end <= prodArray[i].hour + limitNumber(task.duration, 2)))){
                                available = false;
                            }
                        }
                    }
                } else {
                    available = false;
                }

                if(available && task.assigned < task.duration) {
                    if((user.lunch > prodArray[i].hour + limitNumber(task.duration, 2) && user.nap <= prodArray[i].hour + limitNumber(task.duration, 2)) || task.duration - task.assigned === 1) {
                        const newSchedule = {
                            day: day.getTime(),
                            start: prodArray[i].hour,
                            end: prodArray[i].hour + 1,
                        }

                        task.schedule.push(newSchedule);
                        task.assigned = task.assigned + 1;
                    } else {
                        const newSchedule = {
                            day: day.getTime(),
                            start: prodArray[i].hour,
                            end: prodArray[i].hour + 2,
                        }

                        task.schedule.push(newSchedule);
                        task.assigned = task.assigned + 2;
                    }
                }

                if(task.assigned === task.duration) break;
            }
        }
        if(task.assigned === task.duration) break;
    }
}

function assignTime(tasks:Array<ITask>, profile:number, user:any) {

    const sortedTasks = filterAndSortTasks(tasks);
    sortedTasks.forEach((task) => {
        if(!task.manual) {
            const prod5:any[] = [];
            const prod4:any[] = [];
            const prod3:any[] = [];
            const prod2:any[] = [];
            const prod1:any[] = [];

            profiles[profile].forEach(elem => elem.value === 5 ? prod5.push(elem) : elem.value === 4 ? prod4.push(elem) : elem.value === 3 ? prod3.push(elem) : elem.value === 2 ? prod2.push(elem) : prod1.push(elem));

            switch(task.difficulty) {
                case 5:
                    if(task.assigned < task.duration) iterateProd(prod5, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod4, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod3, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod2, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod1, task, user, tasks);
                    break;

                case 3:
                    if(task.assigned < task.duration) iterateProd(prod3, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod4, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod2, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod5, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod1, task, user, tasks);
                    break;

                case 1:
                    if(task.assigned < task.duration) iterateProd(prod1, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod2, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod3, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod4, task, user, tasks);
                    if(task.assigned < task.duration) iterateProd(prod5, task, user, tasks);
                    break;
            }
        }
    });
}

function unassignTasks(tasks:Array<ITask>) {
    tasks.forEach(task => {
        if(!task.manual) {
            task.assigned = 0;
            task.schedule = [];
        }
    });
}

export { assignTime, unassignTasks };