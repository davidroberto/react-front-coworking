import { useState } from "react";

const AdminCoworkingCreate = () => {
  // je créé un stage pour afficher un message de succès ou d'erreur
  const [message, setMessage] = useState(null);

  // je créé une fonction appelé par mon event listener
  // pour créé un coworking
  // la fonction est asynchrone, car on fait un fetch à l'intérieur
  const handleCreateCoworking = async (event) => {
    // j'empêche le rechargement par défaut de la page au submit
    event.preventDefault();

    // je récupère les valeurs du form
    const name = event.target.name.value;
    const priceByMonth = event.target.priceByMonth.value;
    const priceByDay = event.target.priceByDay.value;
    const priceByHour = event.target.priceByHour.value;
    const addressNumber = event.target.addressNumber.value;
    const addressStreet = event.target.addressStreet.value;
    const addressCity = event.target.addressCity.value;
    const addressPostcode = event.target.addressPostcode.value;
    const superficy = event.target.superficy.value;
    const capacity = event.target.capacity.value;

    // je créé un objet avec les valeurs
    // qui correspond à ce que l'api attend (modèle / table)
    // les noms doivent correspondre
    // et les types aussi
    const coworkingToCreate = {
      name: name,
      price: {
        month: priceByMonth,
        day: priceByDay,
        hour: priceByHour,
      },
      address: {
        number: addressNumber,
        street: addressStreet,
        city: addressCity,
        postCode: addressPostcode,
      },
      superficy: superficy,
      capacity: capacity,
    };

    // je transforme mon objet en JSON
    const coworkingToCreateJson = JSON.stringify(coworkingToCreate);

    // je récupère mon token en local storage
    const token = localStorage.getItem("jwt");

    // je fais mon appel fetch
    // sur l'url de création des coworkings
    // de type POST
    // avec en header Bearer authorization le token
    // et en body les données pour créer le coworking
    const createCoworkingResponse = await fetch("http://localhost:3005/api/coworkings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: coworkingToCreateJson,
    });

    // si la réponse de création du coworking a un status 201
    // je créé un message de succès
    // sinon d'erreur
    if (createCoworkingResponse.status === 201) {
      setMessage("Coworking créé !");
    } else {
      setMessage("Erreur !");
    }
  };

  return (
    <>
      {message && <p>{message}</p>}
      <form onSubmit={handleCreateCoworking}>
        <div>
          <label>
            Nom
            <input type="text" name="name" />
          </label>
        </div>
        <div>
          <label>
            Prix par mois
            <input type="number" name="priceByMonth" />
          </label>
        </div>
        <div>
          <label>
            Prix par jour
            <input type="number" name="priceByDay" />
          </label>
        </div>
        <div>
          <label>
            Prix par heure
            <input type="number" name="priceByHour" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Numéro
            <input type="text" name="addressNumber" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Rue
            <input type="text" name="addressStreet" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Ville
            <input type="text" name="addressCity" />
          </label>
        </div>
        <div>
          <label>
            Adresse : Postcode
            <input type="text" name="addressPostcode" />
          </label>
        </div>
        <div>
          <label>
            Superficie
            <input type="number" name="superficy" />
          </label>
        </div>
        <div>
          <label>
            Capacité
            <input type="number" name="capacity" />
          </label>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default AdminCoworkingCreate;
