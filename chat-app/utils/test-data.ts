import {ChatRoom} from "./types";

export const chatRooms: ChatRoom[] = [
    {
        id: "1",
        title: "Chat Room 1",
        description: "A place for general discussions.",
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        title: "Chat Room 2",
        description: "Discuss the latest in technology.",
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];