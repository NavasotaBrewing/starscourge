// This handles the interaction with buttons with the class .enactor
// When clicked, the model will be sent in write mode to the BCS

export default {
    enactors: document.getElementsByClassName("enactor"),
    registerEnactorsWith(callback) {
        for (const en of this.enactors) {
            en.addEventListener('click', () => {
                callback(en);
            });
        }
    },

    setClickableState(newState) {
        for (const en of this.enactors) {
            en.disabled = !newState;
        }
    }
}