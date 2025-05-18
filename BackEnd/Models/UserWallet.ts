/**
 * Modello del saldo del portafoglio
 */
export class UserWallet {
    private _userId: number;
    private _address: string;
    private _balance: number;

	constructor(userId: number, balance: number, address: string) {
		this._userId = userId;
		this._balance = balance;
        this._address = address;
	}

    /**
     * Getter userId
     * @return Identificativo dell'utente
     */
    public get userId(): number {
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
     * Getter address
     * @return Indirizzo del portafoglio
     */ 
    public get address(): string {
        return this._address;
    }

    /**
     * Setter userId
     * @param userId Identificativo dell'utente
     */
    public set userId(userId: number) {
        this._userId = userId;
    }

    /**
     * Setter balance
     * @param balance Saldo del portafoglio
     */
    public set balance(balance: number) {
        this._balance = balance;
    }

    /**
     * Setter address
     * @param address Indirizzo del portafoglio
     */
    public set address(address: string) {
        this._address = address;
    }
}