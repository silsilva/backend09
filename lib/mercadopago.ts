export async function getMerchantOrder(id) {
  const preference = await fetch(
    "https://api.mercadopago.com/merchant_orders/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.MP_TOKEN,
      },
    }
  );

  const dataa = await preference.json();

  return dataa;
}

export async function createPreference(data) {
  try {
    const preference = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + process.env.MP_TOKEN,
        },
        body: JSON.stringify(data),
      }
    );

    const dataa = await preference.json();

    return dataa;
  } catch (error) {
    throw "Error al crear la preferencia en MercadoPago: " + error.message;
  }
}
