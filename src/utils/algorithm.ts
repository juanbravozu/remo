interface ITaskSchedule {
    day: number;
    hour: Array<number>;
}

interface ITask {
    name: string;
    difficulty: number;
    duration: number;
    deadline: string;
    modular: boolean;
    recommend: boolean;
    assigned: number;
    schedule: Array<ITaskSchedule>;
}

interface IRecommendation {
    hour: number;
    value: number;
}

interface IAvailability {
    hour: number;
    available: boolean;
}

interface IUser {
    uid: string,
    name: string,
    profile: number,
    lunch: number,
    nap: number,
    workday: Array<number>,
    satisfaction: number,
    currentWeek: Array<Array<IAvailability>>,
    tasks: Array<ITask>;
}

const profiles = [
    [1, 2, 3, 4, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 3, 4, 5, 5, 4, 4, 5, 4, 3, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5, 4, 4, 3, 2, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5, 4, 4, 3, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 5, 5, 4, 3, 2]
]

const emptyWeek = [
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}],
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}],
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}],
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}],
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}],
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}],
    [{hour: 4, available: true}, {hour: 4.5, available: true}, {hour: 5, available: true}, {hour: 5.5, available: true}, {hour: 6, available: true}, {hour: 6.5, available: true}, {hour: 7, available: true}, {hour: 7.5, available: true}, {hour: 8, available: true}, {hour: 8.5, available: true}, {hour: 9, available: true}, {hour: 9.5, available: true}, {hour: 10, available: true}, {hour: 10.5, available: true}, {hour: 11, available: true}, {hour: 11.5, available: true}, {hour: 12, available: true}, {hour: 12.5, available: true}, {hour: 13, available: true}, {hour: 13.5, available: true}, {hour: 14, available: true}, {hour: 14.5, available: true}, {hour: 15, available: true}, {hour: 15.5, available: true}, {hour: 16, available: true}, {hour: 16.5, available: true}, {hour: 17, available: true}, {hour: 17.5, available: true}, {hour: 18, available: true}, {hour: 18.5, available: true}, {hour: 19, available: true}, {hour: 19.5, available: true}, {hour: 20, available: true}, {hour: 20.5, available: true}, {hour: 21, available: true}, {hour: 21.5, available: true}, {hour: 22, available: true}, {hour: 22.5, available: true}, {hour: 23, available: true}, {hour: 23.5, available: true}]
]

function filterAndSortTasks(tasks:Array<ITask>) {
    const [ manualTasks, recommendTasks ] = filterAssignedTasks(tasks);
    manualTasks.forEach(task => {
        for(let j = 0; j < task.schedule.length; j++) {
            for(let i = task.schedule[j].hour[0]; i < task.schedule[j].hour[1]; i+=0.5) {
                user1.currentWeek[task.schedule[j].day][(i - 4) * 2].available = false;
            }
        }
    });

    recommendTasks.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);

        if(dateA < dateB) {
            return -1
        } else if(dateA > dateB) {
            return 1
        } 
        return 0
    });

    return [ manualTasks, recommendTasks ];
}

function getSimilitude(tasks:Array<ITask>, profile:number) {
    const recommendationValues:Array<Array<IRecommendation>> = [];

    tasks.forEach((task, index) => {
        const taskValues:Array<IRecommendation> = [];
        const taskUrgency = 1 - ((1/tasks.length) * index)

        for(let i = 0; i < (profiles[profile].length*2); i++) {
            const prodValue = profiles[profile][Math.floor(i/2)];
            const value = {
                hour: (i/2) + 4,
                value: calculateSimilitude(task.difficulty, prodValue, taskUrgency, 0.5 - ((0.5/profiles[profile].length * i) + 0.5))
            }
            taskValues.push(value);
        }

        recommendationValues.push(taskValues);
    });

    /* console.log(recommendationValues); */
    return recommendationValues;
}

function filterAssignedTasks(tasks:Array<ITask>) {
    const manualTasks = tasks.filter(task => !task.recommend);
    const recommendTasks = tasks.filter(task => task.recommend);
    return [ manualTasks, recommendTasks ];
}

function calculateSimilitude(prodA:number, prodB:number, urgA:number, urgB:number) {
    const prod = ((prodA * 5) * (prodB * 5)) + ((urgA*0.5) * (urgB*0.5));
    const magA = Math.sqrt(Math.pow(prodA*5, 2) + Math.pow((urgA*0.5), 2));
    const magB = Math.sqrt(Math.pow(prodB*5, 2) + Math.pow((urgB*0.5), 2));
    const result = prod / (magA * magB);
    return result;
}

function distributeTasks(user:IUser, tasks:Array<ITask>, recommendations:Array<Array<IRecommendation>>) {
    const currentDay = new Date();
    setLunchTimeUnavailability(user);
    user.currentWeek.forEach((day, dayIndex) => {
        if(currentDay.getDay() <= dayIndex) { //Día
            tasks.forEach((task, index) => { //Tarea
                if(task.assigned < task.duration) {

                    recommendations.forEach(recommendation => { //Recomendación de cada día

                        recommendation.sort((a, b) => {
                            if(a.value < b.value) {
                                return 1;
                            } 
                            if(a.value > b.value) {
                                return -1;
                            }
                            return 0;
                        });

                        //Recomendación de cada hora de forma ordenada
                        for(let recIndex = 0; recIndex < recommendation.length; recIndex++) {
                            const recHour:IRecommendation = recommendation[recIndex];
                        
                            if(recHour.hour >= user.workday[0] && recHour.hour < user.workday[1]
                            && day[(recHour.hour - 4) * 2].available) {
                                if(task.duration - task.assigned >= 4) {
                                    if(checkAvailability(day, recHour.hour, recHour.hour + 4, user)) {
                                        assignTaskValue(user, task, dayIndex, recHour.hour, recHour.hour+4);
                                    } else {
                                        let offset = 3;
                                        while(offset > 0) {
                                            if(checkAvailability(day, recHour.hour, recHour.hour + offset, user)) {
                                                assignTaskValue(user, task, dayIndex, recHour.hour, recHour.hour+offset);
                                                break;
                                            }
                                            offset--;
                                        }
                                    }
                                } else if(task.duration - task.assigned > 0) {
                                    let offset = task.duration - task.assigned;
                                    while(offset > 0) {
                                        if(task.duration - task.assigned !== 0 && checkAvailability(day, recHour.hour, recHour.hour + offset, user)) {
                                            assignTaskValue(user, task, dayIndex, recHour.hour, recHour.hour+offset);
                                            break;
                                        }
                                        offset--;
                                    }
                                }
                            }

                            if(task.assigned === task.duration) {
                                break;
                            }
                        }
                    });

                    task.schedule.forEach(taskA => {
                        task.schedule.forEach((taskB, index) => {
                            if(taskA.hour[1] === taskB.hour[0]) {
                                taskA.hour[1] = taskB.hour[1];
                                task.schedule.splice(index, 1);
                            }
                        });
                    });

                    for(let j = 0; j < task.schedule.length; j++) {
                        for(let i = task.schedule[j].hour[0]; i < task.schedule[j].hour[1]; i+=0.5) {
                            user1.currentWeek[task.schedule[j].day][(i - 4) * 2].available = false;
                        }
                    }
                } else {
                    for(let j = 0; j < task.schedule.length; j++) {
                        for(let i = task.schedule[j].hour[0]; i < task.schedule[j].hour[1]; i+=0.5) {
                            user1.currentWeek[task.schedule[j].day][(i - 4) * 2].available = false;
                        }
                    }
                }
            });
        }
    });
}

function checkAvailability(day:Array<IAvailability>, initialHour:number, endHour:number, user:IUser) {
    const range = day.filter(hour => (hour.hour >= initialHour && hour.hour < endHour));
    if(!range.some(hour => !day[(hour.hour - 4) * 2].available)) {
        if(initialHour >= user.workday[0] && initialHour < user.workday[1] && endHour >= user.workday[0] && endHour < user.workday[1]) {
            return true;
        }
        return false;
    }
    return false;
}

function assignTaskValue(user:IUser, task:ITask, dayIndex:number, initialHour:number, endHour:number) {
    const hoursToOccupy = user.currentWeek[dayIndex].filter(hour => (hour.hour >= initialHour && hour.hour <= endHour));

    hoursToOccupy.forEach(hour => hour.available = false);

    task.assigned += endHour - initialHour;
    task.schedule.push({day: dayIndex, hour: [initialHour, endHour]});
}

function setLunchTimeUnavailability(user:IUser) {
    user.currentWeek.forEach(day => {
        for(let i = user.lunch; i < user.nap; i += 0.5) {
            day[(i - 4) * 2].available = false;
        }
    });
}

function resetUserWeek(user:IUser) {
    user.currentWeek = emptyWeek;
    user.currentWeek.forEach(day => {
        for(let i = user.lunch; i < user.nap; i += 0.5) {
            day[(i - 4) * 2].available = false;
        }
    });
}

const user1:IUser = {
    uid: "1",
    name: "Usuario",
    profile: 2,
    lunch: 13,
    nap: 14,
    workday: [8, 17],
    satisfaction: 4,
    currentWeek: emptyWeek,
    tasks: [
        {
            name: "Pdg",
            difficulty: 5,
            duration: 16,
            deadline: "Wed Jun 09 2021 14:00:00",
            modular: true,
            recommend: true,
            assigned: 0,
            schedule: []
        },
        {
            name: "Juridico",
            difficulty: 3,
            duration: 3,
            deadline: "Tue Jun 08 2021 18:00:00",
            modular: false,
            recommend: true,
            assigned: 0,
            schedule: []
        },
        {
            name: "IoT",
            difficulty: 3,
            duration: 4,
            deadline: "Fri Jun 11 2021 18:00:00",
            modular: false,
            recommend: false,
            assigned: 4,
            schedule: [{
                day: 3,
                hour: [14, 18]
            }]
        }
    ]
}

const [ userAssignedTasks, pendingTasks ] = filterAndSortTasks(user1.tasks);
const similitudes = getSimilitude(pendingTasks, 2);
distributeTasks(user1, pendingTasks, similitudes);

console.log(user1);

export { getSimilitude, distributeTasks };