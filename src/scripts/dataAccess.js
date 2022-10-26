import { render } from "./main.js"

const applicationState = {
    entries: [],
    instructors: [],
    moods: [],
    tags: [],
    entryTags: []
}
const mainContainer = document.querySelector("#container")

export const fetchEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then(res => res.json())  // Parse as JSON
        .then(entries => {
            applicationState.entries = entries
        })
}
export const fetchMoods = () => {
    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(res => res.json())  // Parse as JSON
        .then(moods => {
            applicationState.moods = moods
        })
}
export const fetchInstructors = () => {
    return fetch("http://localhost:8088/instructors") // Fetch from the API
        .then(res => res.json())  // Parse as JSON
        .then(instructors => {
            applicationState.instructors = instructors
        })
}
export const fetchTags = () => {
    return fetch("http://localhost:8088/tags") // Fetch from the API
        .then(res => res.json())  // Parse as JSON
        .then(tags => {
            applicationState.tags = tags
        })
}
export const fetchEntryTags = () => {
    return fetch("http://localhost:8088/EntryTags") // Fetch from the API
        .then(res => res.json())  // Parse as JSON
        .then(entryTags => {
            applicationState.entryTags = entryTags
        })
}
export const getMoods = () => {
    return structuredClone(applicationState.moods)
}
export const getTags = () => {
    return structuredClone(applicationState.tags)
}
export const getEntryTags = () => {
    return structuredClone(applicationState.entryTags)
}
export const getEntries = () => {
    return structuredClone(applicationState.entries)
}
export const moodFilterEntries = (moodId) => {
    return applicationState.entries = applicationState.entries.filter(entry => entry.mood === moodId)
}

export const getInstructors = () => {
    // let instructorsCopy = 
    return structuredClone(applicationState.instructors)
    // return instructorsCopy
}
export const getMaxEntryId = () => {
    let entryId = applicationState.entries.map(entry => { return entry.id })
    let entryIdMax = Math.max(...entryId)
    return entryIdMax
}
export const getMaxTagId = () => {
    return Math.max(...(applicationState.tags.map(tag => { return tag.id })))
}
let tagIdIncrementer = 0
export const getTagId = (oneTag) => {
    let tags = getTags()
    if (tags.find(tag => tag.subject === oneTag.subject)) {
        let tagFound = tags.find(tag => tag.subject === oneTag.subject)
        oneTag.tagId = tagFound.id
        return oneTag
    } else {
        newTag(oneTag.subject)
        if (tagIdIncrementer>getMaxTagId()+1){
        oneTag.tagId = getMaxTagId()+1
        tagIdIncrementer = getMaxTagId()+1
    } else {
        tagIdIncrementer++
        oneTag.tagId = tagIdIncrementer
        }
    }
        return oneTag 
        //return getTagId(oneTag)
    }

const newTag = (newTag) =>{
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({subject: newTag})
    }
    return fetch("http://localhost:8088/tags", fetchOptions)
        .then(response => response.json())

}
export const sendEntryTags = (newEntryTag) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntryTag)
        }
        return fetch("http://localhost:8088/entryTags", fetchOptions)
            .then(response => response.json())
            .then(fetchEntryTags())
}

////what does the fetchOptions content actually do??
export const sendJournal = (dataToSend, tagsToCheckandSend) => {
    let tags = getTags()
    // Added in a bit to process the tag string for adding tags with entries before 
    // sending journal entry

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    }
    return fetch("http://localhost:8088/entries", fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
export const deleteEntry = (id) => {
    return fetch(`http://localhost:8088/entries/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}