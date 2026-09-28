"use client";

import { useCart } from "../context/cartcontext";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Continue Shopping
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg text-gray-600">
              Your cart is empty.
            </p>

            <Link
              href="/#products"
              className="mt-5 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              View Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">

            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      ₹{item.price} / unit
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
  onClick={() => decreaseQuantity(item.id)}
  style={{
    color: "#000000",
    backgroundColor: "#ffffff",
    border: "2px solid #000000",
    fontSize: "22px",
    fontWeight: 900,
    opacity: 1,
  }}
  className="h-9 w-9 rounded-lg"
>
  -
</button>

                    <span className="w-8 text-center text-lg font-bold text-black">
                      {item.quantity}
                    </span>

                    <button
  onClick={() => increaseQuantity(item.id)}
  style={{
    color: "#000000",
    backgroundColor: "#ffffff",
    border: "2px solid #000000",
    fontSize: "22px",
    fontWeight: 900,
    opacity: 1,
  }}
  className="h-9 w-9 rounded-lg"
>
  +
</button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-sm font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-700">
                  ₹{cartTotal}
                </span>
              </div>

              <Link
              href="/checkout"
                className="mt-6 w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Proceed to Checkout
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}