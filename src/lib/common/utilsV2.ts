import { urlPrefix, languageUrl, collectionsUrl } from "./constantsV2";
import { selectedLanguagesStore } from "./store";

export const getData = async (url: string) => {
  console.log('url {}', url)
  return await fetch(url).then((response) => {
    return response.json();
  });
}

export const languagePromise = getData(`${urlPrefix}${languageUrl}`);

export async function getLanguageFullName(languageShortName: string[]) {
  let languageFullNames: string[] = [];
  let languageObject = await languagePromise;
  languageShortName.forEach((language) => {
    languageFullNames.push(languageObject[language]);
  });
  return languageFullNames;
}

export async function getCollectionPromise() {
  var languages:string = ''; 
  selectedLanguagesStore.subscribe((selectedLanguages) => {
    languages = selectedLanguages.filter(lang => lang !== '').toString();
  });
  
  return getData(`${urlPrefix}${collectionsUrl}&langs=${languages}`);
}

export const collectionUrl = `${urlPrefix}${collectionsUrl}`

export async function getCollectionFullName(collectionShortName: string[]) {
  let collectionFullNames: string[] = [];
  let collectionObject = await getCollectionPromise();

  collectionObject.collections.forEach((collectionCategories: { [x: string]: { [x: string]: string; }[]; }) => {
    collectionCategories["books"].forEach((collection: { [x: string]: string; }) => {
      if (collectionShortName.includes(collection["name"]!)) {
        collectionFullNames.push(collection["eng-name"]);
      }
    });
  });
  return collectionFullNames;
}