import { useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const AdminCoworkingCreate = () => {
  useVerifyIfUserIsLogged();

  const [message, setMessage] = useState(null);

  const handleCreateCoworking = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const priceByMonth = event.target.priceByMonth.value;
    const priceByDay = event.target.priceByDay.value;
    const priceByHour = event.target.priceByHour.value;
    // const addressNumber = event.target.addressNumber.value;
    // const addressStreet = event.target.addressStreet.value;
    // const addressCity = event.target.addressCity.value;
    // const addressPostcode = event.target.addressPostcode.value;
    // const superficy = event.target.superficy.value;
    // const capacity = event.target.capacity.value;

    // const coworkingToCreate = {
    //   name: name,
    const price = {
      month: parseInt(priceByMonth),
      day: parseInt(priceByDay),
      hour: parseInt(priceByHour),
    };
    //   address: {
    //     number: addressNumber,
    //     street: addressStreet,
    //     city: addressCity,
    //     postCode: addressPostcode,
    //   },
    //   superficy: superficy,
    //   capacity: capacity,
    // };

    // const coworkingToCreateJson = JSON.stringify(coworkingToCreate);

    // je créé un objet "FormData" => ça me permet d'envoyer
    // à mon api à la fois des infos JSON (text, number etc)
    // et des fichiers
    const formData = new FormData();

    // dans mon formdata, je créé un champs name, qui contient
    // le nom issu du champs "name", transformé en json
    formData.append("name", JSON.stringify(name));
    formData.append("price", JSON.stringify(price));
    // dans mon formData, je créé un champs file, qui contient
    // le fichier issu du champs image
    formData.append("file", event.target.image.files[0]);

    const token = localStorage.getItem("jwt");

    const createCoworkingResponse = await fetch("http://localhost:3005/api/coworkings/withImg", {
      method: "POST",
      headers: {
        // vu que j'envoie un formData (car j'ai des fichiers)
        // le contenu du body n'est plus du JSON pur
        // donc je commente la ligne
        // "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // j'envoie mon formData en body
      body: formData,
    });

    if (createCoworkingResponse.status === 201) {
      setMessage("Coworking créé !");
    } else {
      setMessage("Erreur !");
    }
  };

  return (
    <>
      <HeaderAdmin />
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

        <div>
          <label>
            Image
            <input type="file" name="image" />
          </label>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default AdminCoworkingCreate;
