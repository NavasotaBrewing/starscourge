// This handles the interaction with buttons with the class .enactor
// When clicked, the model will be sent in write mode to the BCS

export default {
    registerEnactorsWith(callback) {
        let enactors = document.getElementsByClassName("enactor");
        for (const en of enactors) {
            en.addEventListener('click', () => {
                callback(en);
            });
        }
    }
}