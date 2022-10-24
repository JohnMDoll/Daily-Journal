import * as dataAccess from "./dataAccess.js"

let journals = dataAccess.getEntries()
// let entryTags = dataAccess.getEntryTags()

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {

    if (clickEvent.target.id === "send--journal") {
        let tagId = []
        let concept = []
        const entryDate = document.querySelector("input[name='entryDate']").value
        concept = document.querySelector("input[name='concepts']").value
        const entry = document.querySelector("#journal").value
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

        // Send the data to the API for permanent storage
        dataAccess.sendJournal(dataToSendToAPI)
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
            <button class="send--journal" id="send--journal">Send</button></li>
            </section>`

        return html
    }
    const pastEntries = () => {
        let entries = dataAccess.getEntries()
        let entriesHTML = `
        <section class ="past--entries">
        ${entries.map(entry => {return `
        <div class="old--entry" id="entry--${entry.id}">
            <h2>${entry.concept}</h2>
            <div id="entry--entry">${entry.entry}</div>
            <div id="entry--date">${entry.entryDate}</div>
        </div>`
    }).join("")}
        </section>`
        return entriesHTML
    }

    const html = journalForm()+pastEntries()
    return html
}
