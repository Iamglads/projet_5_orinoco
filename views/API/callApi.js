export const url = "http://localhost:3001/api/cameras";

// get all products (cameras) with fetch API
export async function getRessource() {
    try {
        const res = await fetch(url);
        const cameras = await res.json()
        return cameras
    }
    catch (error) {
        // en cas d'erreurs retourner un tableau vide
        return []
    }
}

// get oneProduct with id
export async function getOneCameraById() {
    try {
        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');

        let res = await fetch(url + "/" + id);
        let oneCamera = await res.json()
        return oneCamera
    }
    catch (error) {
        console.log(error)
    }
}




