export interface Opensearch {
    took:      number;
    timed_out: boolean;
    _shards:   Shards;
    hits:      Hits;
}

export interface Shards {
    total:      number;
    successful: number;
    skipped:    number;
    failed:     number;
}

export interface Hits {
    total:     Total;
    max_score: number;
    hits:      Hit[];
}

export interface Hit {
    _index:  string;
    _id:     string;
    _score:  number;
    _source: Source;
}

export interface Source {
    Id:string;
    Type:string;
    Title:string;
    DateTime:string
    PublicationID:string;
    PublicationTitle:string;
    Status:string;
    User:string;
    UserActivity:string
}

export interface Total {
    value:    number;
    relation: string;
}

export interface Mutationdata {
    title:string
    author:string
    year:string
    genre:string
}

export interface IFilters {
    publication?: string[],
    period?: string;
    users?:string[]
}

export interface PublishInfo{
    uri:string;
    month: string;
    title: string;
    status: string;
    publicationTitle: string;
    publicationId: string;
    date: string;
    itemType:string;
    user:string;
    userActivity:string;
}


export interface FilterBy {
    key: string;
    label: string;
    value: string,
    checked: boolean
}

export interface IPieChart{
    name:string;
    value:string;
}