export const url = "http://localhost:3000/api/cameras";

// get all products (cameras) with fetch API
export async function getRessource() {
    const res = await fetch(url);
    const cameras = await res.json()
    return cameras
}

// get oneProduct with id
export async function getOneCameraById() {
    let params = new URLSearchParams(window.location.search);
    params.has('id');
    let id = params.get('id');

    let res = await fetch(url + "/" + id);
    let oneCamera = await res.json()
    return oneCamera
}