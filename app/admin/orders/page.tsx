"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const statuses = [
  "New",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      alert("Status update failed: " + error.message);
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );

    alert("Order status updated!");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">
              SGAV Admin Orders
            </h1>
            <p className="mt-1 text-gray-600">
              Manage customer orders
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/admin/products"
              className="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800"
            >
              Products
            </a>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/admin/login";
              }}
              className="rounded-lg bg-black px-5 py-2 font-semibold text-white hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <p className="text-gray-600">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-black">
                      Order #{order.id}
                    </h2>

                    <p className="mt-2 text-gray-700">
                      <strong>Customer:</strong>{" "}
                      {order.customer?.name}
                    </p>

                    <p className="text-gray-700">
                      <strong>Phone:</strong>{" "}
                      {order.customer?.phone}
                    </p>

                    <p className="text-gray-700">
                      <strong>Email:</strong>{" "}
                      {order.customer?.email}
                    </p>

                    <p className="text-gray-700">
                      <strong>Address:</strong>{" "}
                      {order.customer?.address}
                    </p>

                    <p className="mt-2 text-gray-700">
                      <strong>Payment:</strong>{" "}
                      {order.payment_method}
                    </p>
                  </div>

                  <div>
                    <label className="font-semibold text-black">
                      Order Status
                    </label>

                    <select
                      value={order.status || "New"}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="mt-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-black"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 border-t pt-5">
                  <h3 className="font-bold text-black">
                    Products
                  </h3>

                  {order.items?.map((item: any) => (
                    <div
                      key={item.id}
                      className="mt-2 flex justify-between text-gray-700"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold text-black">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}