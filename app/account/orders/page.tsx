'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PackageCheck, ShoppingBag } from 'lucide-react';
import { ApiError, orderApi, type Order } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';
import { formatPrice } from '@/lib/format';

const statusClassName: Record<string, string> = {
  PENDING: 'bg-cream text-charcoal',
  CONFIRMED: 'bg-gold/10 text-gold',
  PROCESSING: 'bg-blue-50 text-blue-700',
  SHIPPED: 'bg-purple-50 text-purple-700',
  DELIVERED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await orderApi.getMyOrders(token);
        if (isMounted) {
          setOrders(response.data?.orders || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof ApiError ? err.message : 'Failed to load orders.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="bg-white border border-gray-100 p-6 md:p-10">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Purchases</p>
          <h1 className="font-heading italic text-3xl md:text-4xl text-primary">My Orders</h1>
          <p className="text-sm text-muted mt-2">Track order status and review your purchased items.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200">
            <ShoppingBag size={42} className="mx-auto text-muted mb-4" />
            <p className="text-charcoal/70 mb-5">You have not placed any orders yet.</p>
            <Link href="/products" className="text-gold text-sm tracking-wider uppercase font-bold hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block border border-gray-100 p-5 hover:border-gold/60 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-cream flex items-center justify-center text-gold flex-shrink-0">
                      <PackageCheck size={21} />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{order.order_number}</p>
                      <p className="text-sm text-muted mt-1">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })} · {order.total_items} items
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:justify-end">
                    <span className={`px-3 py-1 text-[11px] tracking-widest uppercase font-bold ${statusClassName[order.status] || 'bg-cream text-charcoal'}`}>
                      {order.status}
                    </span>
                    <span className="font-semibold text-primary">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
