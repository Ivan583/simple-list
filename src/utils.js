export const sortByTitle = (a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;

export const sortByStatus = (a, b) => a.stage > b.stage ? 1 : -1;

export const sortByDate = (a, b) => a.id > b.id ? 1 : -1;
