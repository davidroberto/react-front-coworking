import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const AdminCoworkingUpdate = () => {
  useVerifyIfUserIsLogged();

  const { id } = useParams();
  const [coworking, setCoworking] = useState(null);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const coworkingResponse = await fetch("http://localhost:3005/api/coworkings/" + id);
      const coworkingResponseData = await coworkingResponse.json();

      setCoworking(coworkingResponseData.data);
    })();
  }, []);

  const handleUpdateCoworking = async (event) => {
    event.preventDefault();

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

    const coworkingUpdateData = {
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

    const coworkingUpdateDataJson = JSON.stringify(coworkingUpdateData);

    const token = localStorage.getItem("jwt");

    const updateCoworkingResponse = await fetch("http://localhost:3005/api/coworkings/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: coworkingUpdateDataJson,
    });

    if (updateCoworkingResponse.status === 201) {
      setMessage("Mise à jour OK");
    } else {
      setMessage("Erreur");
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div>
        <>{message && <p>{message}</p>}</>
        {coworking && (
          <form onSubmit={handleUpdateCoworking}>
            <div>
              <label>
                Nom
                <input type="text" name="name" defaultValue={coworking.name} />
              </label>
            </div>
            <div>
              <label>
                Prix par mois
                <input type="number" name="priceByMonth" defaultValue={coworking.price.month} />
              </label>
            </div>
            <div>
              <label>
                Prix par jour
                <input type="number" name="priceByDay" defaultValue={coworking.price.day} />
              </label>
            </div>
            <div>
              <label>
                Prix par heure
                <input type="number" name="priceByHour" defaultValue={coworking.price.hour} />
              </label>
            </div>
            <div>
              <label>
                Adresse : Numéro
                <input type="text" name="addressNumber" defaultValue={coworking.address.number} />
              </label>
            </div>
            <div>
              <label>
                Adresse : Rue
                <input type="text" name="addressStreet" defaultValue={coworking.address.street} />
              </label>
            </div>
            <div>
              <label>
                Adresse : Ville
                <input type="text" name="addressCity" defaultValue={coworking.address.city} />
              </label>
            </div>
            <div>
              <label>
                Adresse : Postcode
                <input type="text" name="addressPostcode" defaultValue={coworking.address.postCode} />
              </label>
            </div>
            <div>
              <label>
                Superficie
                <input type="number" name="superficy" defaultValue={coworking.superficy} />
              </label>
            </div>
            <div>
              <label>
                Capacité
                <input type="number" name="capacity" defaultValue={coworking.capacity} />
              </label>
            </div>

            <input type="submit" />
          </form>
        )}
      </div>
    </>
  );
};

export default AdminCoworkingUpdate;
