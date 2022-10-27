export type FillElement = Element | EventTarget | RadioNodeList | null;

export interface IPassword {
    username : string;
    password: string;
}

export interface ICard {
    nameOnCard: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
}

export type PasswordType = keyof IPassword;

export type CardType = keyof ICard;

export interface Item {
    getName(): string;

    getDescription(): string;
}

export class Password implements Item, IPassword {
    username: string;
    password: string;
    length: number = 0;
    
    constructor(i: IPassword) {
        this.username = i.username;
        this.password = i.password;
        this.length = i.password.length < 10 ? i.password.length : 10;
    }

    getDescription(): string {
        return "*".repeat(this.length);
    }

    getName(): string {
        return this.username;
    }
}


export class Card implements Item, ICard {
    nameOnCard: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;

    constructor(i: ICard) {
        this.nameOnCard = i.nameOnCard;
        this.cardNumber = i.cardNumber;
        this.expirationDate = i.expirationDate;
        this.securityCode = i.securityCode;
    }

    getDescription(): string {
        return '**** ' + this.cardNumber.slice(-4, -1) + ', expires on ' + this.expirationDate;
    }

    getName(): string {
        return this.nameOnCard;
    }
}
