// export const urlPrefix = "https://cdn.jsdelivr.net/gh/GibreelAbdullah/hadith-api-updater@master/hadith-api-master";
// export const urlPrefix = "https://raw.githubusercontent.com/GibreelAbdullah/hadith-api-updater/master/hadith-api-master";
export const urlPrefix = process.env.API_URL || "https://raw.githubusercontent.com/GibreelAbdullah/hadith-api-updater/master/hadith-api-master";

// Run command 'npx serve --cors' in hadith-api folder to run a local webserver
// export const urlPrefix = "http://localhost:3000/";

// export const searchUrl = 'https://hadithmlsearch2.fly.dev/search/';
// export const searchUrl = 'https://hadith-search-api-gibreelabdullah.koyeb.app/search';
// export const searchUrl = 'http://0.0.0.0:5000/search';
// export const searchUrl = 'https://us-east4-hadith-hub.cloudfunctions.net/function-1/search';
export const searchUrl = 'https://jzufhqzxs3t7w632plkwg6k5lq0rvvfl.lambda-url.us-east-1.on.aws/';

export const languageUrl = "/updates/collections/languages.min.json";

export const collectionsUrl = "/updates/collections/collections.min.json";

export const muhaddithUrl = '/updates/muhaddith/'