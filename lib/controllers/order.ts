import { createPreference } from "lib/mercadopago";
import { Order, createNewOrder } from "lib/order";
import { getProductById } from "./product";

type OrderProps = {
  aditionalInfo: {};
  productId: string;
  userId: string;
  status: string;
};

export async function newOrder({
  aditionalInfo,
  productId,
  userId,
  status,
}: OrderProps) {
  const productById = (await getProductById(productId)) as any;

  const order = await createNewOrder({
    aditionalInfo,
    productId,
    userId,
    status,
  });
  const pref = await createPreference({
    external_reference: order.id,
    items: [
      {
        id: productId,
        title: productById["Name"],
        description: productById["Description"],
        picture_url: productById["Images"].url,
        quantity: 1,
        currency_id: "ARS",
        unit_price: productById["Unit cost"],
      },
    ],
    notification_url:
      "https://webhook.site/f9bb4984-b581-4690-9367-1259af1e2884",
  });
  console.log(pref);

  return { url: pref.init_point, orderId: pref.external_reference };
}
