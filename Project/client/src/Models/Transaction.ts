export class Transaction {
    private _id: number;
    private _senderUserId: number;
    private _receiverUserId: number;
    private _senderWalletAddress: string;
    private _receiverWalletAddress: string;
    private _amount: number;
    private _transactionType: string;
    private _timestamp: Date;

    constructor(id: number, senderUserId: number, receiverUserId: number, senderWalletAddress: string, 
                receiverWalletAddress: string, amount: number, transactionType: string, timestamp: Date) {
        this._id = id;
        this._senderUserId = senderUserId;
        this._receiverUserId = receiverUserId;
        this._senderWalletAddress = senderWalletAddress;
        this._receiverWalletAddress = receiverWalletAddress;
        this._amount = amount;
        this._transactionType = transactionType;
        this._timestamp = timestamp;
    }

    public get id(): number {
        return this._id;
    }

    public get senderUserId(): number {
        return this._senderUserId;
    }

    public get receiverUserId(): number {
        return this._receiverUserId;
    }

    public get senderWalletAddress(): string {
        return this._senderWalletAddress;
    }

    public get receiverWalletAddress(): string {
        return this._receiverWalletAddress;
    }

    public get amount(): number {
        return this._amount;
    }

    public get transactionType(): string {
        return this._transactionType;
    }

    public get timestamp(): Date {
        return this._timestamp;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set senderUserId(value: number) {
        this._senderUserId = value;
    }

    public set receiverUserId(value: number) {
        this._receiverUserId = value;
    }

    public set senderWalletAddress(value: string) {
        this._senderWalletAddress = value;
    }

    public set receiverWalletAddress(value: string) {
        this._receiverWalletAddress = value;
    }

    public set amount(value: number) {
        this._amount = value;
    }

    public set transactionType(value: string) {
        this._transactionType = value;
    }

    public set timestamp(value: Date) {
        this._timestamp = value;
    }
}
