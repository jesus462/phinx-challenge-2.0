// Here we make sure that the url has the secure protocols, because the property that we are 
// accesing comes in http, with this split we separete the http from the APIComicsUrl and add
// the https

export const addHttps = (url) => {
    let splitURL = url.split(":")[1];
    return `https:${splitURL}`;
}