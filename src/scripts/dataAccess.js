const applicationState = {
    entries: [],
    instructors: [],
    moods: [],
    tags: []
}
const mainContainer = document.querySelector("#container")

export const fetchEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then(res=> res.json())  // Parse as JSON
        .then(entries => {
            applicationState.entries = entries
        })
}
export const fetchMoods = () => {
    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(res=> res.json())  // Parse as JSON
        .then(moods => {
            applicationState.moods = moods
        })
}
export const getMoods=()=>{
    // let moodsCopy = 
    return structuredClone(applicationState.moods)
    // return moodsCopy
}
export const getEntries=()=>{
    // let entrycopy = 
    return structuredClone(applicationState.entries)
    // return entrycopy
}
export const fetchInstructors = () => {
    return fetch("http://localhost:8088/instructors") // Fetch from the API
        .then(res=> res.json())  // Parse as JSON
        .then(instructors => {
            applicationState.instructors = instructors
        })
}
export const getInstructors=()=>{
    // let instructorsCopy = 
    return structuredClone(applicationState.instructors)
    // return instructorsCopy
}
////what does the fetchOptions content actually do??
export const sendJournal = (dataToSend) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    }

///
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