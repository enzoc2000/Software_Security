function ExchangePage(dati_utente:{nameUtente: string, creditiUtente: string, emissioniUtente: string}, dati_attore:{nameAttore:string, creditiAttore:string, emissioniAttore:string} ) {
  return (
    <div>
      <h1>Dati Attore</h1>
      <p>Qui ci sono i tuoi dati</p>
      
      <h1>Dati Attore a cui inviare crediti</h1>
      <p>Qui ci sono i dati dell'attore a cui inviare crediti</p>
    </div>
  );
}

export default ExchangePage;