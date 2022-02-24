let numberOfPersonsAndProjects = 0
let numberOfPersons = 0
let numberOfProjects = 0
let lineCounter = 0

class Contributor{
    constructor(name, skills){
        this.name = name;
        this.skills = skills;
    }
}
class Project{
    constructor(name, numberOfdDays, score, bestBefore, numberOfPeople, requiredSkills){
        this.name = name;
        this.numberOfdDays = numberOfdDays;
        this.score = score;
        this.bestBefore = bestBefore;
        this.numberOfPeople = numberOfPeople;
        this.requiredSkills = requiredSkills;
    }
}

function readTextFile() {
    let currentPerson = 0
    let numberOfSkills = 0
    let currentSkill = 0
    // Make sure we got a filename on the command line.
    var fs = require('fs');

    try {
        lineCounter = 0
        var data = fs.readFileSync('a_an_example.in.txt', 'utf8');
        console.log(data.toString());
        dataArray = data.split('\n')
        console.log(dataArray);
        console.log("----")
        aantalPersonen = dataArray[0]
        numberOfPersonsAndProjects = dataArray.shift();
        numberOfPersons = numberOfPersonsAndProjects.split(' ')[0];
        numberOfProjects = numberOfPersonsAndProjects.split(' ')[1];
        console.log(dataArray)
        console.log(numberOfPersons)
        console.log(currentPerson)
        while(numberOfPersons > currentPerson){
            
            let name = dataArray[lineCounter].split(' ')[0];
            numberOfSkills = dataArray[lineCounter].split(' ')[1];
            lineCounter++;
            let skills = [];
            while(numberOfSkills > currentSkill){
                skills.push(dataArray[lineCounter].split(' '))
                currentSkill++;
                lineCounter++;
            }
            let person = new Contributor(name, skills);
            console.log(person)
            currentPerson++;
            currentSkill = 0;
        }
        let currentProject = 0
        let currentProjectSkill = 0
        while(numberOfProjects > currentProject){
        
            let projectName = dataArray[lineCounter].split(' ')[0];
            let numberOfDays = dataArray[lineCounter].split(' ')[1];;
            let score = dataArray[lineCounter].split(' ')[2];
            let bestBefore = dataArray[lineCounter].split(' ')[3];
            let numberOfPeople = dataArray[lineCounter].split(' ')[4];
            lineCounter++;
            let projectSkills = [];
            while(numberOfPeople > currentProjectSkill){
                console.log(dataArray[lineCounter].split(' '))
                projectSkills.push(dataArray[lineCounter].split(' '))
                currentProjectSkill++;
                lineCounter++;
            }
            project = new Project(projectName,numberOfDays,score,bestBefore,numberOfPeople,projectSkills);
            console.log(project);
            console.log(project.requiredSkills)
            currentProject++;
            currentProjectSkill = 0;
            
        }
        
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return dataArray;
}

readTextFile();

