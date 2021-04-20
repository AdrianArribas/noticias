export interface RespuestaTopHeadLines {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
}

export interface Source {
    id?: string;
    name: string;
}

// ############ MediaStack
export interface MediaStackObj {
    pagination: Pagination;
    data: Datum[];
}

export interface Datum {
    author?: string;
    title: string;
    description: string;
    url: string;
    source: string;
    image?: any;
    category: string;
    language: string;
    country: string;
    publishedAt: string;
}

export interface Pagination {
    limit: number;
    offset: number;
    count: number;
    total: number;
}
