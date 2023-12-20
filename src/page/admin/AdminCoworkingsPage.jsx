import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const AdminCoworkingsPage = () => {
  useVerifyIfUserIsLogged();

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

  // je créé une fonction, qui récupère un  id de coworking
  // et qui va créer sur l'api une review
  const handleCreateReview = async (event, coworkingId) => {
    event.preventDefault();

    // je récupère les valeurs du formulaire
    const content = event.target.content.value;
    const rating = event.target.rating.value;

    // je créé un objet avec les valeurs du formulaire
    // + l'id du coworking passé en parametre
    const reviewToCreate = {
      content: content,
      rating: rating,
      CoworkingId: coworkingId,
    };

    // je transforme en JSON mon objet
    const reviewToCreateJson = JSON.stringify(reviewToCreate);

    // je fais mon appel fetch sur la création d'une review
    // en passant le token en authorization
    // et le le json avec les données du form (et l'id du coworking)
    await fetch("http://localhost:3005/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: reviewToCreateJson,
    });
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
                {/* 
                je créé un form pour chaque coworking 
                et au submit j'appelle la fonction handleCreateReview
                en lui passant l'id du coworking actuel
                */}
                <form onSubmit={(event) => handleCreateReview(event, coworking.id)}>
                  <label>
                    Review: contenu
                    <input type="text" name="content" />
                  </label>

                  <label>
                    Review: note
                    <input type="number" name="rating" />
                  </label>

                  <input type="submit" />
                </form>
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
