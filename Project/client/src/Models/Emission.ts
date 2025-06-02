/**
 * Modello emissione CO2
 */
export class Emission {
    private _id: number;
    private _userId: number;
    //Quantità di CO2 emessa in kg
    private _co2Amount: number;
    private _timestamp: Date;
    private _carbonCredits: number;

	constructor(id: number, userId: number, co2Amount: number, timestamp: Date, carbonCredits: number) {
		this._id = id;
		this._userId = userId;
		this._co2Amount = co2Amount;
		this._timestamp = timestamp;
        this._carbonCredits = carbonCredits;
	}

    /**
     * Getter id
     * @return Identificativo emissione
     */ 
    public get id(): number {
        return this._id;
    }

    /**
     * Getter userId
     * @return Identificativo utente
     */
    public get userId(): number {
        return this._userId;
    }

    /**
     * Getter co2Amount
     * @return Quantità di CO2 emessa in kg
     */
    public get co2Amount(): number {
        return this._co2Amount;
    }

    /**
     * Getter timestamp
     * @return Data e ora di emissione
     */
    public get timestamp(): Date {
        return this._timestamp;
    }

    /**
     * Getter carbonCredits
     * @return Quantità di carbon credits associati all'emissione
     */
    public get carbonCredits(): number {
        return this._carbonCredits;
    }

    /**
     * Setter id
     * @param id Identificativo emissione
     */
    public set id(id: number) {
        this._id = id;
    }

    /**
     * Setter userId
     * @param userId Identificativo utente
     */
    public set userId(userId: number) {
        this._userId = userId;
    }

    /**
     * Setter co2Amount
     * @param co2Amount Quantità di CO2 emessa in kg
     */
    public set co2Amount(co2Amount: number) {
        this._co2Amount = co2Amount;
    }

    /**
     * Setter timestamp
     * @param timestamp Data e ora di emissione
     */
    public set timestamp(timestamp: Date) {
        this._timestamp = timestamp;
    }

    /**
     * Setter carbonCredits
     * @param carbonCredits Quantità di carbon credits associati all'emissione
     */
    public set carbonCredits(carbonCredits: number) {
        this._carbonCredits = carbonCredits;    
    }
}