import { fetchMoods, fetchEntries, fetchInstructors, fetchEntryTags, fetchTags, getEntries, moodFilterEntries } from "./dataAccess.js";
import { WriteJournal } from "./JournalForm.js";

const mainContainer = document.querySelector("#container")
export const render = () => {
    fetchEntries()
        .then(() => fetchMoods())
        .then(() => fetchInstructors())
        .then(() => fetchTags())
        .then(() => fetchEntryTags())
        .then(
            () => {
                mainContainer.innerHTML = WriteJournal()
            }
        )
}
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
//rerenders with only entries with selected meed
mainContainer.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.name === "mood--filter") {
            fetchEntries()
                .then(() => {
                    let moodId = clickEvent.target.value
                    moodFilterEntries(moodId)
                    mainContainer.innerHTML = WriteJournal()
                })
        }
    }
)

render()

