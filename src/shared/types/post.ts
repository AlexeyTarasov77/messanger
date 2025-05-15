export interface IPost {
    id: number;
    body: string;
    tags: string[];
    likesCount: number;
    viewsCount: number;
    media: {
        type: string;
        url: string;
    }[];
    author?: {
        username: string;
        avatarUrl: string;
        isOnline: boolean;
    };
}