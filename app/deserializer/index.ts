import type { Comment, Post, User } from "~/types";

export const deserializeUser = (data: any): User => {
    return {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        address: {
            street: data.street,
            suite: data.suite,
            city: data.city,
            zipcode: data.zipcode,
            geo: {
                lat: data.lat,
                lng: data.lng,
            },
        },
        phone: data.phone,
        website: data.website,
        company: {
            name: data.name,
            catchPhrase: data.catchPhrase,
            bs: data.bs,
        },
    };
};

export const deserializeComment = (data: any): Comment => {
    return {
        id: data.id,
        body: data.body,
        email: data.email,
        name: data.name,
        postId: data.postId,
    };
};

export const deserializePost = (data: any): Post => {
    return {
        userId: data.userId,
        id: data.id,
        body: data.body,
        title: data.title,
        comments: data.comments
            ? data.comments.map((item: any) => deserializeComment(item))
            : [],
        user: data.user ? deserializeUser(data.user) : undefined,
    };
};
