/**
 * Dati di seed degli utenti della filiera.
 */

export const seedUsers = [
    {
        id: 1,
        username: 'aziendaAgricola',
        password: 'Password123',
        email: 'aziendaagricola@gmail.com',
        role: 'azienda_agricola',
        name: 'Azienda Agricola Rossi',
        city: 'Roma',
        address: 'Via Roma 1',
        /*wallet: {
            id: 1,
            address: '0x1234567890abcdef1234567890abcdef12345678',
            balance: 0,
        },*/
        walletAddress: '0x829CB82CCa7C9471aB05c668031f34E67C2dfFeb',
    },
    {
        id: 2,
        username: 'aziendaTrasporti',
        password: 'Password456',
        email: 'aziendatrasportatore@gmail.com',
        role: 'trasportatore',
        name: 'Azienda Trasporti Bianchi',
        city: 'Milano',
        address: 'Via Milano 1',
        /*wallet: {
            id: 2,
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            balance: 0,
        },*/
        walletAddress: '0x31B8281FeC25A6afbfAF3b8693516DbA891Ab526',
    },
    {
        id: 3,
        username: 'aziendaRivenditore',
        password: 'Password789',
        email: 'aziendarivenditore@gmail.com',
        role: 'rivenditore',
        name: 'Azienda Rivenditore Verdi',
        city: 'Torino',
        address: 'Via Torino 1',
        /*wallet: {
            id: 3,
            address: '0x7890abcdef1234567890abcdef1234567890abcd',
            balance: 0,
        },*/
        walletAddress: '0x7890abcdef1234567890abcdef1234567890abcd',
    },
  ];

  export const seedSerialCodes = [
    {
        serial_code: 'A9D3X7L2MQY8',
        is_used: false,
    },
    {
        serial_code: 'P4K8N1TZRW35',
        is_used: false,
    },
    {
        serial_code: 'M6Q2F9BLXE7Y',
        is_used: false,
    },
    {
        serial_code: 'Z8M1K5RQD2LW',
        is_used: false,
    },
    {
        serial_code: 'H3TX9BL7E6PA',
        is_used: false,
    },
    {
        serial_code: 'J5Q2N8X1R4Z6',
        is_used: false,
    },
    {
        serial_code: 'V7K3F9L2M8Y1',
        is_used: false,
    },
    {
        serial_code: 'B4D6X1P9Q3W8',
        is_used: false,
    },
    {
        serial_code: 'C2H5T8L7M1Q9',
        is_used: false,
    },
    {
        serial_code: 'R6F3K9X2B4Y1',
        is_used: false,
    },
  ];