const apiURL = "http://localhost:5002/";

const jAPI = {

    getWithId(str, id) {
        return fetch(apiURL + str + "/" + id).then(entries => entries.json());
    },
    get(str) {
        return fetch(apiURL + str).then(entries => entries.json());
    },
    userMovieExpand(entity, userId) {
        return fetch(apiURL + entity + "?userId=" + userId + "&_expand=movie").then(entries => entries.json())
    },
    movieExpand(entity) {
        return fetch(apiURL + entity + "?_expand=movie").then(entries => entries.json())
    },
    save(objToSave, str) {
        return fetch(apiURL + str, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToSave)
        })
            .then(savedObj => savedObj.json())
    },
    delete(objToDeleteId, str) {
        return fetch(`${apiURL}${str}/${objToDeleteId}`, {
            method: "DELETE"
        });
    },
    expand(str, toExpand) {
        return fetch(`${apiURL}${str}/?_expand=${toExpand}`).then(entries => entries.json());
    },
    embedWithId(str, id, toEmbed) {
        return fetch(`${apiURL}${str}/${id}?_embed=${toEmbed}`).then(entries => entries.json());
    },
    patch(objToEdit, str, id) {
        return fetch(`${apiURL}${str}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objToEdit)
        });
    },
};

export default jAPI;

