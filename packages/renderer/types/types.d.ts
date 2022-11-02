export declare type FillElement = Element | EventTarget | RadioNodeList | null;
export interface IPassword {
    username: string;
    password: string;
}
export interface ICard {
    nameOnCard: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
}
export declare type PasswordType = keyof IPassword;
export declare type CardType = keyof ICard;
export interface Item {
    getName(): string;
    getDescription(): string;
}
export declare class Password implements Item, IPassword {
    username: string;
    password: string;
    length: number;
    constructor(i: IPassword);
    getDescription(): string;
    getName(): string;
}
export declare class Card implements Item, ICard {
    nameOnCard: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
    constructor(i: ICard);
    getDescription(): string;
    getName(): string;
}
