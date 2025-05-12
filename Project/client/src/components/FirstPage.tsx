import React, { useState } from "react";
import logoSupplyChain from "./assets/logoSupplyChain.png";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/usersSlice";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  crediti: string;
  emissioni: string;
}

function FirstPage() {
  // Assuming the "users" slice returns an array of User objects.
  const dati_attore: User[] = useSelector((state: any) => state.users.value);

  // Example state for a single User. Adjust initial values as needed.
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    crediti: "",
    emissioni: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Function to store the selected item in sessionStorage.
  const handleCardClick = (item: User) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
      sessionStorage.setItem("dati_utente", JSON.stringify(item));
      sessionStorage.setItem("dati_attore", JSON.stringify(item));
};

  return (
    <div>
      <img src={logoSupplyChain} alt="Supply Chain Logo" />
      {dati_attore.map((item: User) => (
        <Link
          to={`/ExchangePage/${item.id}`}
          key={item.id}
          onClick={() => handleCardClick(item)}
        >
          <Card key={item.id} name={item.name} crediti={item.crediti} CO2={item.emissioni} />
        </Link>
      ))}
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
    </div>
  );
}

export default FirstPage;