import { View } from "@lightbend/akkaserverless-javascript-sdk";

const view = new View(
    [
        "shoppingcart_domain.proto",
        "shoppingcart_api.proto"
    ],
    "com.example.shoppingcart.ShoppingCartView",
    {
        viewId: "myview"
    }
);

export default view