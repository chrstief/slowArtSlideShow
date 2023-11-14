// https://metmuseum.github.io/
import axios from 'axios';

type SearchResult = {
	total: number;
	objectIDs: number[];
};

export type Painting = {
	objectID: number;
	isHighlight: boolean;
	accessionNumber: string;
	accessionYear: string;
	isPublicDomain: boolean;
	primaryImage: string;
	primaryImageSmall: string;
	additionalImages: string[];
	constituents: {
		constituentID: number;
		role: string;
		name: string;
		constituentULAN_URL: string;
		constituentWikidata_URL: string;
		gender: string;
	}[];
	department: string;
	objectName: string;
	title: string;
	culture: string;
	period: string;
	dynasty: string;
	reign: string;
	portfolio: string;
	artistRole: string;
	artistPrefix: string;
	artistDisplayName: string;
	artistDisplayBio: string;
	artistSuffix: string;
	artistAlphaSort: string;
	artistNationality: string;
	artistBeginDate: string;
	artistEndDate: string;
	artistGender: string;
	artistWikidata_URL: string;
	artistULAN_URL: string;
	objectDate: string;
	objectBeginDate: number;
	objectEndDate: number;
	medium: string;
	dimensions: string;
	measurements: {
		elementName: string;
		elementDescription: string | null;
		elementMeasurements: {
			Height: number;
			Width: number;
		};
	}[];
	creditLine: string;
	geographyType: string;
	city: string;
	state: string;
	county: string;
	country: string;
	region: string;
	subregion: string;
	locale: string;
	locus: string;
	excavation: string;
	river: string;
	classification: string;
	rightsAndReproduction: string;
	linkResource: string;
	metadataDate: string;
	repository: string;
	objectURL: string;
	tags: {
		term: string;
		AAT_URL: string;
		Wikidata_URL: string;
	}[];
	objectWikidata_URL: string;
	isTimelineWork: boolean;
	GalleryNumber: string;
};

const metmuseum = axios.create({
	baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1',
});

export async function fetchPaintings(
	numberOfPaintings: number
): Promise<Painting[]> {
	const {data: searchResult}: {data: SearchResult} = await metmuseum.get(
		'/objects',
		{
			params: {
				departmentIds: 11,
			},
		}
	);

	const paintings = await Promise.all(
		searchResult.objectIDs.slice(0, numberOfPaintings).map(async (objectID) => {
			try {
				const {data: painting}: {data: Painting} = await metmuseum.get(
					`/objects/${objectID}`
				);
				return painting;
			} catch {
				return null;
			}
		})
	);

	return paintings.filter(
		(painting): painting is Painting =>
			!!painting &&
			!!painting.primaryImage &&
			painting.isPublicDomain &&
			painting.classification == 'Paintings'
	);
}
