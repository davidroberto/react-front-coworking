import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";

const AdminCoworkingsPage = () => {
  const [coworkings, setCoworkings] = useState(null);
  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    (async () => {
      const coworkingsResponse = await fetch("http://localhost:3005/api/coworkings");
      const coworkingsResponseData = await coworkingsResponse.json();
      setCoworkings(coworkingsResponseData);
    })();
  }, []);

  const handleDeleteCoworking = async (event, coworkingId) => {
    await fetch("http://localhost:3005/api/coworkings/" + coworkingId, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    const coworkingsResponse = await fetch("http://localhost:3005/api/coworkings");
    const coworkingsResponseData = await coworkingsResponse.json();
    setCoworkings(coworkingsResponseData);
  };

  return (
    <>
      <HeaderAdmin />
      <h1>Liste des coworkings : </h1>

      {coworkings ? (
        <>
          {coworkings.map((coworking) => {
            return (
              <article>
                <h2>{coworking.name}</h2>
                {decodedToken.data.role !== 3 && (
                  <button onClick={(event) => handleDeleteCoworking(event, coworking.id)}>Supprimer</button>
                )}
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </>
  );
};

export default AdminCoworkingsPage;
