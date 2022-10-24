import { fetchMoods, fetchEntries, fetchInstructors } from "./dataAccess.js";
import { WriteJournal } from "./JournalForm.js";

const mainContainer = document.querySelector("#container")
const render = () => {
    fetchEntries()
        .then(() => fetchMoods())
           .then(() => fetchInstructors())
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
render()

