import { Message } from "./Message";
import { MessageDto } from "./MessageDto";
import { Chat } from "./Chat";
import { ChatDto } from "./ChatDto";
import { User } from "./User";
import { LoginRequest } from "./LoginRequest";
import { Themes } from "./Themes";
import { Contact } from "./Contact";

export type { Message, MessageDto, Chat, ChatDto, User, LoginRequest, Contact }
export { Themes };
export type ThemeType = typeof Themes[keyof typeof Themes];
