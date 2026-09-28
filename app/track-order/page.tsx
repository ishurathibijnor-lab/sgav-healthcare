"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const statuses = [
  "New",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const trackOrder = async () => {
    if (!orderId || !phone) {
      setMessage("Please enter Order ID and phone number.");
      return;
    }

    setLoading(true);
    setMessage("");
    setOrder(null);

    const { data, error } = await supabase.rpc(
  "track_sgav_order",
  {
    order_id: orderId.trim(),
    customer_phone: phone.trim(),
  }
);

    setLoading(false);

    if (error || !data || data.length === 0) {
      setMessage("Order not found. Please check your Order ID.");
      return;
    }

    const foundOrder = data[0];

    if (foundOrder.customer?.phone !== phone.trim()) {
      setMessage("Order not found. Please check your phone number.");
      return;
    }

    setOrder(foundOrder);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-black">
            Track Your Order
          </h1>

          <p className="mt-2 text-gray-600">
            Enter your Order ID and phone number to check your order status.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="font-semibold text-black">
                Order ID
              </label>

              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Example: SGAV-123456789"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-black">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black"
              />
            </div>

            <button
              onClick={trackOrder}
              disabled={loading}
              className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-50"
            >
              {loading ? "Checking..." : "Track Order"}
            </button>

            {message && (
              <p className="font-semibold text-red-600">
                {message}
              </p>
            )}
          </div>
        </div>

        {order && (
          <div className="mt-6 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-black">
              Order #{order.id}
            </h2>

            <div className="mt-6">
              <p className="font-semibold text-gray-700">
                Current Status
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {order.status}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {statuses.map((status, index) => {
                const currentIndex = statuses.indexOf(
                  order.status || "New"
                );

                const completed = index <= currentIndex;

                return (
                  <div
                    key={status}
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                        completed
                          ? "bg-green-700 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <span
                      className={`font-semibold ${
                        completed
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold text-black">
                Order Total
              </h3>

              <p className="mt-1 text-xl font-bold text-black">
                ₹{order.total}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}