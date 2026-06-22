'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CreditCard, MapPin, PackageCheck, Truck } from 'lucide-react';
import { ApiError, orderApi, type Order } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';
import { formatPrice } from '@/lib/format';
import { toast } from 'react-hot-toast';

const statusClassName: Record<string, string> = {
  PENDING: 'bg-cream text-charcoal',
  CONFIRMED: 'bg-gold/10 text-gold',
  PROCESSING: 'bg-blue-50 text-blue-700',
  SHIPPED: 'bg-purple-50 text-purple-700',
  DELIVERED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const routeOrderId = Number(params.id);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(routeOrderId > 0);
  const [error, setError] = useState(routeOrderId > 0 ? '' : 'Invalid order id.');
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    setIsCancelling(true);
    const token = getToken();
    try {
      if (token && order) {
        const response = await orderApi.cancelOrder(token, order.id);
        if (response.success && response.data) {
          toast.success('Order cancelled successfully.');
          setOrder(response.data);
        } else {
          toast.error(response.message || 'Failed to cancel order.');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Error cancelling order.');
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    if (!routeOrderId) return;

    let isMounted = true;

    const loadOrder = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await orderApi.getOrder(token, routeOrderId);
        if (isMounted) {
          setOrder(response.data || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof ApiError ? err.message : 'Failed to load order.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [routeOrderId]);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-100 p-10 flex justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white border border-gray-100 p-6 md:p-10">
        <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold mb-6">
          <ArrowLeft size={16} />
          Back to orders
        </Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error || 'Order not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="bg-white border border-gray-100 p-6 md:p-10">
        <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold mb-6">
          <ArrowLeft size={16} />
          Back to orders
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Order Detail</p>
            <h1 className="font-heading italic text-3xl md:text-4xl text-primary">{order.order_number}</h1>
            <p className="text-sm text-muted mt-2">
              Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <span className={`self-start px-3 py-1 text-[11px] tracking-widest uppercase font-bold ${statusClassName[order.status] || 'bg-cream text-charcoal'}`}>
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-gray-100 p-5">
            <Truck size={21} className="text-gold mb-3" />
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Delivery</p>
            <p className="font-semibold text-primary">{order.status}</p>
          </div>
          <div className="border border-gray-100 p-5">
            <CreditCard size={21} className="text-gold mb-3" />
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Payment</p>
            <p className="font-semibold text-primary">
              {order.payment_mode === 'COD' ? 'Cash on Delivery' : 'Online Payment'} · {order.payment_status}
            </p>
          </div>
          <div className="border border-gray-100 p-5">
            <PackageCheck size={21} className="text-gold mb-3" />
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Total</p>
            <p className="font-semibold text-primary">{formatPrice(order.total_amount)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-heading italic text-2xl text-primary mb-5">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 border border-gray-100 p-4">
                  <Link href={`/products/${item.product_slug}`} className="relative w-20 h-24 md:w-24 md:h-28 bg-cream/60 flex-shrink-0">
                    {item.product_image ? (
                      <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">No Image</div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product_slug}`} className="font-heading italic text-lg md:text-xl text-primary hover:text-gold transition-colors">
                      {item.product_name}
                    </Link>
                    <p className="text-sm text-muted mt-2">Qty {item.quantity} × {formatPrice(item.unit_price)}</p>
                    <p className="font-semibold text-primary mt-3">{formatPrice(item.item_total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="border border-gray-100 p-5 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-gold" />
                <h2 className="font-heading italic text-xl text-primary">Delivery Address</h2>
              </div>
              <div className="text-sm text-charcoal/75 leading-relaxed">
                <p className="font-semibold text-primary">{order.shipping_address_line1}</p>
                {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
                <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_postal_code}</p>
                <p>{order.shipping_country}</p>
                <p className="text-muted mt-2">+91 {order.shipping_contact_number}</p>
              </div>
            </div>

            <div className="border border-gray-100 p-5">
              <h2 className="font-heading italic text-xl text-primary mb-4">Summary</h2>
              <div className="space-y-3 text-sm text-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping_amount === 0 ? 'Free' : formatPrice(order.shipping_amount)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-primary pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </div>

            {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
              <div className="mt-5">
                <button 
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 py-3 text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
