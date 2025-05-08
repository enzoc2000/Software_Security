/**
 * Modello utente della filiera
 */
export class User {
    private _id: number;
    private _username: string;
    private _password: string;
    //(Azienda trasportatrice, agricola, rivenditore, ecc.)
    private _role: string;
    private _name: string;
    private _city: string;
    private _address: string;
    private _streetNumber: string;
    //URL immagine logo
    private _companyLogo: string;
    //Facoltativo in attesa di capire come gestirlo (se presente o meno in fase di registrazione)
    private _walletAddress?: string;
  
    constructor(id: number, username: string, password: string, role: string, name: string, city: string, 
        address: string, streetNumber: string, companyLogo: string, walletAddress?: string) {
      this._id = id;
      this._username = username;
      this._password = password;
      this._role = role;
      this._name = name;
      this._city = city;
      this._address = address;
      this._streetNumber = streetNumber;
      this._companyLogo = companyLogo;
      this._walletAddress = walletAddress;
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
	public get password(): string {
		return this._password;
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
     * Getter streetNumber
     * @return Numero civico dell'utente
     */
	public get streetNumber(): string {
		return this._streetNumber;
	}

    /**
     * Getter companyLogo
     * @return URL del logo dell'utente
     */
	public get companyLogo(): string {
		return this._companyLogo;
	}

    /**
     * Getter walletAddress
     * @return Indirizzo del wallet dell'utente
    */
    public get walletAddress(): string | undefined {
		return this._walletAddress;
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
	public set password(password: string) {
		this._password = password;
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
     * Setter streetNumber
     * @param {number} streetNumber
     */
	public set streetNumber(streetNumber: string) {
		this._streetNumber = streetNumber;
	}

    /**
     * Setter companyLogo
     * @param {string} companyLogo
     */
	public set companyLogo(companyLogo: string) {
		this._companyLogo = companyLogo;
	}

    /**
     * Setter walletAddress
     * @param {string} walletAddress
     */
    public set walletAddress(walletAddress: string) {
		this._walletAddress = walletAddress;
	}
    
}