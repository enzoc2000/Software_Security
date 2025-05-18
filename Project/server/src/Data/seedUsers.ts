/**
 * Dati di seed degli utenti della filiera.
 */

export const seedUsers = [
    {
        id: 1,
        username: 'azienda_agricola',
        password: 'password123',
        role: 'farmer',
        name: 'Azienda Agricola Rossi',
        city: 'Roma',
        address: 'Via Roma 1',
        streetNumber: '1',
        companyLogo: 'logo_azienda_agricola.png',
        wallet: {
            id: 1,
            address: '0x1234567890abcdef1234567890abcdef12345678',
            balance: 0,
        },
    },
    {
        id: 2,
        username: 'azienda_trasporti',
        password: 'password456',
        role: 'transporter',
        name: 'Azienda Trasporti Bianchi',
        city: 'Milano',
        address: 'Via Milano 1',
        streetNumber: '1',
        companyLogo: 'logo_azienda_trasporti.png',
        wallet: {
            id: 2,
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            balance: 0,
        },
    },
    {
        id: 3,
        username: 'azienda_rivenditore',
        password: 'password789',
        role: 'retailer',
        name: 'Azienda Rivenditore Verdi',
        city: 'Torino',
        address: 'Via Torino 1',
        streetNumber: '1',
        companyLogo: 'logo_azienda_rivenditore.png',
        wallet: {
            id: 3,
            address: '0x7890abcdef1234567890abcdef1234567890abcd',
            balance: 0,
        },
    },
  ];