import * as dataAccess from "./dataAccess.js"

const mainContainer = document.querySelector("#container")
//all the listeners are in here
mainContainer.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "send--journal") {
        const entryDate = document.querySelector("input[name='entryDate']").value
        const concept = document.querySelector("input[name='concepts']").value
        const entry = document.querySelector("#journal").value
        let tagString = document.querySelector("input[name='tags']").value
        const instructor = document.querySelector("#instructor").value
        const mood = document.querySelector("#mood").value
        
        // Make an object out of the user input
        const dataToSendToAPI = {
            entryDate: entryDate,
            concept: concept,
            entry: entry,
            instructor: instructor,
            mood: mood
        }
        let tagArray = tagString.split(",")
        //next function for entryTag objects
        for (const tag of tagArray){
            
            let entryId = dataAccess.getMaxEntryId()+1
            let tagObj={subject: tag, entryId: entryId}
            dataAccess.getTagId(tagObj)
            dataAccess.sendEntryTags({entryId: tagObj.entryId, tagId: tagObj.tagId})
        }
        // Send the data to the API for permanent storage
        
        dataAccess.sendJournal(dataToSendToAPI)
        
    }
    if (clickEvent.target.id.startsWith("delete--")) {
        
        let [,entryId] = clickEvent.target.id.split("--")
        dataAccess.deleteEntry(entryId)
    }

})
export const WriteJournal = () => {
    // let topics = dataAccess.getTopics()
    // let pals = dataAccess.getPals()
    let instructors = dataAccess.getInstructors()
    let moods = dataAccess.getMoods()
    const journalForm = () => {
        let html = `<section class="form">
            <fieldset class="field">
                <label class="label" for="entryDate">Date of Entry</label>
                <input type="date" name="entryDate" class="input" value=""/>
            </fieldset>
            <fieldset class="field">
                <label class="label" for="topic--selection">Covered Concepts</label>
                <input type="text" name="concepts" class="input" />
            </fieldset>
            <fieldset class="field">
                <label class="label" for="journal">Journal</label>
                <textarea name="journal" id="journal"></textarea>
            </fieldset>
            <fieldset class="field">
                <label class="label" for="tag--entry">Tags</label>
                <input type="text" name="tags" class="input" />
            </fieldset>
            <fieldset class="field">
                <label class="label" for="instructor">Instructor</label>
                <select class="instructor" id="instructor"/>
                <option value="instructor">Choose Instructor...</option>
                ${instructors.map(instructor => {return `<option name="instructor" value="${instructor.id}">${instructor.firstName}</option>`
            }).join("")}
                </select>
            </fieldset>
            <fieldset class="field">
                <label class="label" for="mood">Mood of the day</label>
                <select class="mood" id="mood"/>
                <option name="mood">MOOD</option>
                    ${moods.map(mood => {return `<option name="mood" value="${mood.id}">${mood.name}</option>`
                    }).join("")}
                </select>
            </fieldset>
            <button class="send--journal" id="send--journal">Send</button>
            </section>`
        return html
    }
    const moodFilter= () =>{
        let moodFilter =  `<section class="filter">
            <fieldset class="field" id="filter">
                <legend class="label" for="mood--filter">Filter Journal Entries by Mood</legend>
                ${moods.map(mood => {return `
                    <div><input type="radio" name="mood--filter" value="${mood.id}"/>
                    <label for="moodFilter--${mood.name}">${mood.name}</label></div>`
            }).join("")}
            </fieldset>
            </section>`
        return moodFilter
        }

    const pastEntries = () => {
        let entries = dataAccess.getEntries()
        let entriesHTML = `
        <section class ="past--entries">
        ${entries.map(entry => {
            let entryMood=moods.find(mood => 
                mood.id === parseInt(entry.mood))
            
            return `
        <div class="old--entry" id="entry--${entry.id}">
            <h2>${entry.concept}</h2>
            <div id="entry--entry">${entry.entry}</div>
            <div id="entry--mood">${entryMood.name}</div>
            <div id="entry--date">${entry.entryDate}</div>
            <button class="delete" id="delete--${entry.id}">Delete</button>
            </div>`
    }).join("")}
        </section>`
        return entriesHTML
    }

    const html = journalForm()+moodFilter()+pastEntries()
    return html
}
