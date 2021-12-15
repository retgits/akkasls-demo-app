import { ValueEntity } from "@lightbend/akkaserverless-javascript-sdk";

const entity = new ValueEntity(
    ["shoppingcart_domain.proto", "shoppingcart_api.proto"],
    "com.example.shoppingcart.ShoppingCartService",
    "shoppingcart",
    {
        includeDirs: ["./"],
        serializeFallbackToJson: true
    }
);

const pkg = "com.example.shoppingcart.domain.";
const Cart = entity.lookupType(pkg + "Cart");
entity.setInitial(cartId => Cart.create({ items: [] }));

entity.setCommandHandlers({
    AddItem: addItem,
    RemoveItem: removeItem,
    RemoveCart: removeCart
});

function addItem(addItem, cart, ctx) {
    if (addItem.quantity < 1) {
        ctx.fail("Cannot add negative quantity to item " + addItem.productId);
    } else {
        const existing = cart.items.find(item => {
            return item.productId === addItem.productId;
        });

        if (existing) {
            existing.quantity = existing.quantity + addItem.quantity;
        } else {
            cart.items.push(addItem);
        }
        ctx.updateState(cart);
    }
    return {};
}

function removeItem(removeItem, cart, ctx) {
    const existing = cart.items.find(item => {
        return item.productId === removeItem.productId;
    });

    if (!existing) {
        ctx.fail("Item " + removeItem.productId + " not in cart");
    } else {
        cart.items = cart.items.filter(item => {
            return item.productId !== removeItem.productId;
        });

        ctx.updateState(cart);
    }
    return {};
}

function removeCart(request, cart, ctx) {
    ctx.deleteState();
    return {};
}

export default entity;