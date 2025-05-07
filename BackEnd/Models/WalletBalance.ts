/**
 * Modello del saldo del portafoglio
 */
export class WalletBalance {
    private _id: number;
    private _userId: string;
    private _balance: number;

	constructor(id: number, userId: string, balance: number) {
		this._id = id;
		this._userId = userId;
		this._balance = balance;
	}

    /**
     * Getter id
     * @return Identificativo del saldo del portafoglio
     */ 
    public get id(): number {
        return this._id;
    }

    /**
     * Getter userId
     * @return Identificativo dell'utente
     */
    public get userId(): string {
        return this._userId;
    }

    /**
     * Getter balance
     * @return Saldo del portafoglio
     */
    public get balance(): number {
        return this._balance;
    }

    /**
     * Setter id
     * @param id Identificativo del saldo del portafoglio
     */
    public set id(id: number) {
        this._id = id;
    }

    /**
     * Setter userId
     * @param userId Identificativo dell'utente
     */
    public set userId(userId: string) {
        this._userId = userId;
    }

    /**
     * Setter balance
     * @param balance Saldo del portafoglio
     */
    public set balance(balance: number) {
        this._balance = balance;
    }
}