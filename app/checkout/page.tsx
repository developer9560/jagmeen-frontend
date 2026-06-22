'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, CreditCard, MapPin, PackageCheck, Plus, ShieldCheck, Truck, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthInput from '@/components/ui/AuthInput';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { addressApi, ApiError, cartApi, orderApi, type CartData, type Order, type PaymentMode } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';
import { formatPrice } from '@/lib/format';
import type { Address, AddressCreatePayload } from '@/types/auth';

const EMPTY_ADDRESS_FORM = {
  contact_number: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'India',
  is_default: false,
};

export default function CheckoutPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { getCartItems, refreshCartSummary } = useCart();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('COD');
  const [customerNote, setCustomerNote] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (authLoading) return;

    let isMounted = true;

    const loadCheckout = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const [cart, addressResponse] = await Promise.all([
          getCartItems(),
          addressApi.getMyAddresses(token),
        ]);

        if (!isMounted) return;

        const loadedAddresses = addressResponse.data || [];
        setCartData(cart);
        setAddresses(loadedAddresses);
        setSelectedAddressId(
          loadedAddresses.find((address) => address.is_default)?.id || loadedAddresses[0]?.id || null
        );
      } catch (err) {
        if (isMounted) {
          setError(err instanceof ApiError ? err.message : 'Failed to load checkout.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCheckout();

    return () => {
      isMounted = false;
    };
  }, [authLoading, getCartItems, isAuthenticated]);

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  const isEmpty = !cartData || cartData.items.length === 0;

  const handleAddressSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSavingAddress(true);

    const token = getToken();
    if (!token || !user) {
      setError('Please sign in to add an address.');
      setIsSavingAddress(false);
      return;
    }

    try {
      const payload: AddressCreatePayload = {
        ...addressForm,
        user_id: user.id,
      };
      const response = await addressApi.addAddress(token, payload);
      const savedAddress = response.data;
      const updatedAddresses = await addressApi.getMyAddresses(token);

      setAddresses(updatedAddresses.data || []);
      if (savedAddress) {
        setSelectedAddressId(savedAddress.id);
      }
      setAddressForm(EMPTY_ADDRESS_FORM);
      setShowAddressForm(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save address.');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    setError('');

    const token = getToken();
    if (!token || !selectedAddressId) {
      setError('Please select a delivery address.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const validation = await cartApi.validateCheckout(token);
      if (!validation.can_checkout) {
        setError(validation.issues?.join(' ') || validation.message || 'Cart is not ready for checkout.');
        return;
      }

      const response = await orderApi.placeOrder(token, {
        address_id: selectedAddressId,
        payment_mode: paymentMode,
        customer_note: customerNote.trim() || undefined,
      });

      if (response.data) {
        setPlacedOrder(response.data);
        setCartData(null);
        await refreshCartSummary();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to place order.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center bg-cream/30">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center bg-cream/30 px-4 text-center">
          <ShieldCheck size={48} className="text-muted mb-6" />
          <h1 className="font-heading italic text-3xl md:text-4xl text-primary mb-4">Sign in to checkout</h1>
          <p className="text-muted mb-8">Your bag is waiting. Please sign in before placing an order.</p>
          <Link href="/login" className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors">
            Sign In
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (placedOrder) {
    return (
      <>
        <Header />
        <main className="bg-cream/30 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="bg-white border border-gray-100 p-8 md:p-12 text-center">
              <CheckCircle2 size={56} className="mx-auto text-gold mb-6" />
              <p className="text-xs tracking-[0.25em] uppercase text-gold font-bold mb-3">Order Confirmed</p>
              <h1 className="font-heading italic text-4xl md:text-5xl text-primary mb-4">Thank you for your order</h1>
              <p className="text-charcoal/70 mb-8">
                Your order {placedOrder.order_number} has been placed successfully.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8">
                <div className="border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Payment</p>
                  <p className="font-semibold text-primary">{placedOrder.payment_mode === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
                </div>
                <div className="border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Status</p>
                  <p className="font-semibold text-primary">{placedOrder.status}</p>
                </div>
                <div className="border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-widest text-muted mb-1">Total</p>
                  <p className="font-semibold text-primary">{formatPrice(placedOrder.total_amount)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/" className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors">
                  Continue Shopping
                </Link>
                <Link href="/account" className="border border-primary text-primary text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:border-gold hover:text-gold transition-colors">
                  My Account
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isEmpty) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center bg-cream/30 px-4 text-center">
          <PackageCheck size={48} className="text-muted mb-6" />
          <h1 className="font-heading italic text-3xl md:text-4xl text-primary mb-4">Your bag is empty</h1>
          <p className="text-muted mb-8">Add something beautiful before checking out.</p>
          <Link href="/products" className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors">
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-cream/30 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-bold mb-2">Secure Checkout</p>
            <h1 className="font-heading italic text-4xl md:text-5xl text-primary">Complete Your Order</h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white border border-gray-100 p-5 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Step 1</p>
                    <h2 className="font-heading italic text-2xl md:text-3xl text-primary">Delivery Address</h2>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center justify-center gap-2 border border-primary px-5 py-3 text-xs tracking-widest uppercase text-primary font-bold hover:border-gold hover:text-gold transition-colors"
                  >
                    <Plus size={15} />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddressSubmit} className="border border-gray-100 bg-cream/40 p-5 md:p-6 mb-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading italic text-xl text-primary">New Address</h3>
                      <button type="button" onClick={() => setShowAddressForm(false)} className="text-muted hover:text-primary">
                        <X size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <AuthInput
                        label="Contact Number"
                        value={addressForm.contact_number}
                        onChange={(event) => setAddressForm({ ...addressForm, contact_number: event.target.value.replace(/\D/g, '').slice(0, 10) })}
                        required
                      />
                      <AuthInput
                        label="Postal Code"
                        value={addressForm.postal_code}
                        onChange={(event) => setAddressForm({ ...addressForm, postal_code: event.target.value.replace(/\D/g, '').slice(0, 6) })}
                        required
                      />
                    </div>

                    <AuthInput
                      label="Address Line 1"
                      value={addressForm.address_line1}
                      onChange={(event) => setAddressForm({ ...addressForm, address_line1: event.target.value })}
                      required
                    />
                    <AuthInput
                      label="Address Line 2"
                      value={addressForm.address_line2}
                      onChange={(event) => setAddressForm({ ...addressForm, address_line2: event.target.value })}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <AuthInput label="City" value={addressForm.city} onChange={(event) => setAddressForm({ ...addressForm, city: event.target.value })} required />
                      <AuthInput label="State" value={addressForm.state} onChange={(event) => setAddressForm({ ...addressForm, state: event.target.value })} required />
                    </div>

                    <AuthInput label="Country" value={addressForm.country} onChange={(event) => setAddressForm({ ...addressForm, country: event.target.value })} required />

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addressForm.is_default}
                        onChange={(event) => setAddressForm({ ...addressForm, is_default: event.target.checked })}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-sm text-charcoal">Set as default address</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSavingAddress}
                      className="bg-primary text-white px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold hover:bg-gold transition-colors disabled:opacity-60"
                    >
                      {isSavingAddress ? 'Saving...' : 'Save Address'}
                    </button>
                  </form>
                )}

                {addresses.length === 0 ? (
                  <div className="border border-dashed border-gray-200 p-8 text-center">
                    <MapPin size={36} className="mx-auto text-muted mb-4" />
                    <p className="text-charcoal/70 mb-4">Add a delivery address to continue.</p>
                    <button onClick={() => setShowAddressForm(true)} className="text-gold text-sm tracking-widest uppercase font-bold hover:underline">
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddressId(address.id)}
                        className={`text-left border p-5 transition-colors ${
                          selectedAddressId === address.id ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gold/60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
                          <div className="text-sm text-charcoal leading-relaxed">
                            <p className="font-semibold text-primary">{address.address_line1}</p>
                            {address.address_line2 && <p>{address.address_line2}</p>}
                            <p>{address.city}, {address.state} - {address.postal_code}</p>
                            <p>{address.country}</p>
                            {address.contact_number && <p className="text-muted mt-2">+91 {address.contact_number}</p>}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="bg-white border border-gray-100 p-5 md:p-8">
                <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Step 2</p>
                <h2 className="font-heading italic text-2xl md:text-3xl text-primary mb-6">Payment Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('COD')}
                    className={`border p-5 text-left transition-colors ${paymentMode === 'COD' ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gold/60'}`}
                  >
                    <Truck size={22} className="text-gold mb-3" />
                    <p className="font-semibold text-primary mb-1">Cash on Delivery</p>
                    <p className="text-sm text-muted">Pay when your order arrives.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode('ONLINE')}
                    className={`border p-5 text-left transition-colors ${paymentMode === 'ONLINE' ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gold/60'}`}
                  >
                    <CreditCard size={22} className="text-gold mb-3" />
                    <p className="font-semibold text-primary mb-1">Online Payment</p>
                    <p className="text-sm text-muted">Demo mode now. Gateway can be connected later.</p>
                  </button>
                </div>
              </section>

              <section className="bg-white border border-gray-100 p-5 md:p-8">
                <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Step 3</p>
                <h2 className="font-heading italic text-2xl md:text-3xl text-primary mb-5">Order Note</h2>
                <textarea
                  value={customerNote}
                  onChange={(event) => setCustomerNote(event.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 bg-white px-4 py-3.5 text-sm text-primary placeholder:text-muted focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Any delivery instruction? Optional"
                />
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-5 md:p-8 lg:sticky lg:top-24">
                <h2 className="font-heading italic text-2xl text-primary mb-6">Order Review</h2>

                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
                  {cartData.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-20 bg-cream/60 flex-shrink-0">
                        {item.product_image ? (
                          <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary line-clamp-2">{item.product_name}</p>
                        <p className="text-xs text-muted mt-1">Qty {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary mt-2">{formatPrice(item.item_total)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm text-charcoal/80 border-t border-gray-100 pt-5 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartData.total_items} items)</span>
                    <span>{formatPrice(cartData.total_price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-gold uppercase text-[10px] tracking-wider font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold text-primary pt-2">
                    <span>Total</span>
                    <span>{formatPrice(cartData.total_price)}</span>
                  </div>
                </div>

                {selectedAddress && (
                  <div className="bg-cream/50 p-4 text-xs text-charcoal/75 leading-relaxed mb-6">
                    <p className="font-bold text-primary mb-1">Delivering to</p>
                    <p>{selectedAddress.address_line1}</p>
                    {selectedAddress.address_line2 && <p>{selectedAddress.address_line2}</p>}
                    <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.postal_code}</p>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || !selectedAddressId}
                  className="w-full bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold py-4 hover:bg-gold transition-colors disabled:opacity-60 disabled:hover:bg-primary"
                >
                  {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                </button>

                <p className="text-center text-xs text-muted mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} />
                  Your order details are securely saved
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
