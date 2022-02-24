const { throws } = require('assert')
const fs = require('fs')

let numberOfPersonsAndProjects = 0
let numberOfPersons = 0
let numberOfProjects = 0
let lineCounter = 0
let personData =[]
let projectData = []
let queue = []
let days = 0
let activeProjects = []
let finishedProject = []

class Contributor{
    constructor(name, skills){
        this.name = name;
        this.skills = skills;
        this.status = false 
    }
}
class Project{
    constructor(name, numberOfDays, score, bestBefore, numberOfPeople, requiredSkills){
        this.name = name;
        this.numberOfDays = numberOfDays;
        this.score = score;
        this.bestBefore = bestBefore;
        this.numberOfPeople = numberOfPeople;
        this.requiredSkills = requiredSkills;
        this.status = false
        this.contributors = []
        this.daysCounter = 0
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
        // console.log(data.toString());
        dataArray = data.split('\n')
        // console.log(dataArray);
        // console.log("----")
        aantalPersonen = dataArray[0]
        numberOfPersonsAndProjects = dataArray.shift();
        numberOfPersons = numberOfPersonsAndProjects.split(' ')[0];
        numberOfProjects = numberOfPersonsAndProjects.split(' ')[1];
        // console.log(dataArray)
        // console.log(numberOfPersons)
        // console.log(currentPerson)
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
            personData.push(person)
            // console.log(person)
            currentPerson++;
            currentSkill = 0;
        }
        let currentProject = 0
        let currentProjectSkill = 0
        while(numberOfProjects > currentProject){
        
            let projectName = dataArray[lineCounter].split(' ')[0];
            let numberOfDays = dataArray[lineCounter].split(' ')[1];
            let score = dataArray[lineCounter].split(' ')[2];
            let bestBefore = dataArray[lineCounter].split(' ')[3];
            let numberOfPeople = dataArray[lineCounter].split(' ')[4];
            lineCounter++;
            let projectSkills = [];
            while(numberOfPeople > currentProjectSkill){
                // console.log(dataArray[lineCounter].split(' '))
                skill = dataArray[lineCounter].split(' ')
                skill.push(false)
                projectSkills.push(skill)
                
                currentProjectSkill++;
                lineCounter++;
            }
            project = new Project(projectName,numberOfDays,score,bestBefore,numberOfPeople,projectSkills);
            // console.log(project.requiredSkills)
            projectData.push(project)
            // console.log(project);
            // console.log(project.requiredSkills)
            currentProject++;
            currentProjectSkill = 0;
            
        }
        
    } catch (e) {
        console.log('Error:', e.stack);
        
    }
}

function simulate(){
    newDay()

}

function priorotize(todos,availablePeople){
    queue = []
    for(let task of todos){
        if(task.status ===false){
            let currentProjectDoable = true
            for(let requiredSkill of task.requiredSkills){
                let currentSkillDoable = false
                for(let person of availablePeople){
                    for(let personSkill of person.skills){
                        if(personSkill[0] === requiredSkill[0] && personSkill[1] >= requiredSkill[1] && person.status === false){
                         currentSkillDoable = true
                        }
                    }
                }
                if(currentSkillDoable === false){
                    currentProjectDoable = false
    
                }
            }
            if(currentProjectDoable ===true){
                queue.push(task)
    
            }
        
            // console.log("+==================================")
            
        }
        // console.log(queue)
        queue =  queue.sort(compareBestBefore)
        }
      
}

function compareBestBefore(a,b){
    if(a.bestBefore > b.bestBefore){
        return 1
    }
    if(a.bestBefore < b.bestBefore){
        return -1
    }
    return 0 

}
function newDay(){
    while(true){
    let availablePeople = []
    let todos = []
    for(let person of personData){
        if(person.status == false){
            availablePeople.push(person)
        }
    }
    for(let task of projectData){

        if(task.status == false){
            todos.push(task)
            // console.log(task)
        }
    }
    priorotize(todos,availablePeople)
    while(queue.length != 0){
        // console.log(queue)
        startProject(queue[0],availablePeople)
        priorotize(todos,availablePeople)
       
     
        



    }
    for(project of activeProjects){
        project.daysCounter ++

        if(project.daysCounter == project.numberOfDays){
            finishedProject.push(project)

            for(let contributor of project.contributors){
                contributor.status = false
            }    
            console.log("==========================")
            let counter = 0
            for(let index in activeProjects){
                if(activeProjects[index] === project){
                    console.log("ye")
                    counter = index 

                }
            }
            
            activeProjects.splice(counter,1)
            console.log(finishedProject)

            
        }
    }
    if( activeProjects.length != 0){
        output()
    }
}
    


}
function startProject(project,availablePeople){
    
        project.status= true
    for(let requiredSkill of project.requiredSkills){
        for(let person of availablePeople){
            for(let personSkill of person.skills){
                if(personSkill[0] === requiredSkill[0] && personSkill[1] >= requiredSkill[1] && person.status === false){
                    project.contributors.push(person)
                    person.status = true

                }
            }
        }
    }    
    activeProjects.push(project)
 

}

function output(){
    let contentArray = [finishedProject.length]
    for(project of finishedProject){
      contentArray.push(project.name)
      let contributors = []
      for(cont of project.contributors){
          contributors.push(cont.name)
      }
      contentArray.push(contributors)
    }
    console.log(contentArray)
    // const  = [3,"webserver",["anna", "bob"], "logging",["anna"],"webchat", ["maria", "bob"]]


for(let i = 0; i < contentArray.length; i++){
    console.log("=======+++++++++++++++++++++++++++++++++++++++++++++++++++++++++===============")
    console.log(contentArray[i].toString().replace(",", " ") + "\n" )
    fs.writeFile('C:\Users\Quinten\googleHashCodeHackaton\oplossing.txt', contentArray[i].toString().replace(",", " ") + "\n",{ flag: 'a+' }, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
}

}


readTextFile();
simulate()

