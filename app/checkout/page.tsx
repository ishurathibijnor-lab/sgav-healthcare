"use client";
import { supabase} from "../lib/supabase";
import { useState } from "react";

import Link from "next/link";

import { useCart } from "../context/cartcontext";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [orderPlaced, setOrderPlaced] = useState(false);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-600">
            Please add a product before checkout.
          </p>

          <Link
            href="/#products"
            className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white"
          >
            View Products
          </Link>
        </div>
      </main>
    );
  }
  if (orderPlaced) {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">

        <div className="rounded-2xl bg-white p-10 shadow-sm">

          <div className="text-5xl">✓</div>

          <h1 className="mt-5 text-3xl font-bold text-black">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for your order.
          </p>

          <p className="mt-2 text-gray-600">
            We will contact you shortly for order confirmation and delivery details.
          </p>

          <p className="mt-6 text-xl font-bold text-green-700">
            Order Total: ₹{cartTotal}
          </p>

          <Link
            href="/"
            className="mt-7 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/cart"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to Cart
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">

          {/* Customer Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Details
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{color:"#111827", backgroundColor:"#ffffff"}}
                  className="mt-1 w-full rounded-lg border px-4 py-3 text-black caret-black outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{color:"#111827", backgroundColor:"#ffffff"}}
                  className="mt-1 w-full rounded-lg border px-4 py-3 text-black caret-black outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                
                  style={{color:"#111827", backgroundColor:"#ffffff"}}
                  className="mt-1 w-full rounded-lg border px-4 py-3 text-black caret-black outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  placeholder="Enter complete delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  style={{color:"#111827", backgroundColor:"#ffffff"}}
                  rows={4}
                  className="mt-1 w-full rounded-lg border px-4 py-3 text-black caret-black outline-none focus:border-green-600"
                />
              </div>
              <div>
  <label className="font-semibold text-black">
    Payment Method
  </label>

  <div className="mt-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-black">
    Cash on Delivery (COD)
  </div>
</div>

            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className="flex items-center justify-between pt-3">
                <span className="text-lg font-bold text-black">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-700">
                  ₹{cartTotal}
                </span>
              </div>

              <button
  onClick={async () => {
  if (!name || !phone || !email || !address) {
    alert("Please fill all customer details.");
    return;
  }

  const order = {
    id: "SGAV-" + Date.now(),
    customer: {
      name,
      phone,
      email,
      address,
    },
    items: cart,
    total: cartTotal,
    payment_method: "Cash on Delivery",
    status: "New",
  };

  const { error } = await supabase
    .from("orders")
    .insert(order);

  if (error) {
    alert("Order could not be placed: " + error.message);
    return;
  }

  const existingOrders = JSON.parse(
    localStorage.getItem("sgav-orders") || "[]"
  );

  localStorage.setItem(
    "sgav-orders",
    JSON.stringify([
      ...existingOrders,
      {
        ...order,
        paymentMethod: "Cash on Delivery",
        date: new Date().toLocaleString(),
      },
    ])
  );

  setOrderPlaced(true);
}}
  className="mt-5 w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
>
  Place Order
</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}