import { UserWallet } from "./UserWallet";

/**
 * Modello utente della filiera
 */
export class User {
    private _id: number;
    private _username: string;
    private _passwordHash: string;
    //(Azienda trasportatrice, agricola, rivenditore, ecc.)
    private _role: string;
    private _name: string;
    private _city: string;
    private _address: string;
    //Facoltativo in attesa di capire come gestirlo (se presente o meno in fase di registrazione)
    private _wallet?: UserWallet;
  
    constructor(id: number, username: string, password: string, role: string, name: string, city: string, 
        address: string, wallet?: UserWallet) {
      this._id = id;
      this._username = username;
      this._passwordHash = password;
      this._role = role;
      this._name = name;
      this._city = city;
      this._address = address;
      this._wallet = wallet;
    }
    
    /**
     * Getter id
     * @return Identificativo utente
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter username
     * @return Username utente
     */
	public get username(): string {
		return this._username;
	}

    /**
     * Getter password
     * @return Password utente
     */
	public get passwordHash(): string {
		return this._passwordHash;
	}

    /**
     * Getter role
     * @return Ruolo dell'utente nella filiera
     */
	public get role(): string {
		return this._role;
	}

    /**
     * Getter name
     * @return Nome dell'azienda
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter city
     * @return Città dell'utente
     */
	public get city(): string {
		return this._city;
	}

    /**
     * Getter address
     * @return Indirizzo dell'utente
     */
	public get address(): string {
		return this._address;
	}

    /**
     * Getter walletAddress
     * @return Indirizzo del wallet dell'utente
    */
    public get wallet(): UserWallet | undefined {
		return this._wallet;
	}

    /**
     * Setter id
     * @param {number} id
     */
    public set id(id: number) {
        this._id = id;
    }

    /**
     * Setter username
     * @param {string} username
     */
	public set username(username: string) {
		this._username = username;
	}

    /**
     * Setter password
     * @param {string} password
     */
	public set passwordhash(password: string) {
		this._passwordHash = password;
	}

    /**
     * Setter role
     * @param {string} role
     */
	public set role(role: string) {
		this._role = role;
	}

    /**
     * Setter name
     * @param {string} name
     */
	public set name(name: string) {
		this._name = name;
	}

    /**
     * Setter city
     * @param {string} city
     */
	public set city(city: string) {
		this._city = city;
	}

    /**
     * Setter address
     * @param {string} address
     */
	public set address(address: string) {
		this._address = address;
	}

    /**
     * Setter walletAddress
     * @param {string} walletAddress
     */
    public set wallet(wallet: UserWallet) {
		this._wallet = wallet;
	}
    
}