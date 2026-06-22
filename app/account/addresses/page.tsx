'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { MapPin, Plus, Pencil, X, Star } from 'lucide-react';
import AuthInput from '@/components/ui/AuthInput';
import { useAuth } from '@/context/AuthContext';
import { addressApi, ApiError } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';
import type { Address, AddressCreatePayload, AddressUpdatePayload } from '@/types/auth';

const EMPTY_FORM = {
  contact_number: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'India',
  is_default: false,
};

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAddresses = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await addressApi.getMyAddresses(token);
      setAddresses(response.data || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load addresses.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const openEditForm = (address: Address) => {
    setEditingId(address.id);
    setForm({
      contact_number: address.contact_number || '',
      address_line1: address.address_line1,
      address_line2: address.address_line2 || '',
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    });
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const token = getToken();
    if (!token || !user) return;

    try {
      if (editingId) {
        const payload: AddressUpdatePayload = { ...form };
        await addressApi.updateAddress(token, editingId, payload);
        setSuccess('Address updated successfully.');
      } else {
        const payload: AddressCreatePayload = {
          ...form,
          user_id: user.id,
        };
        await addressApi.addAddress(token, payload);
        setSuccess('Address added successfully.');
      }
      await fetchAddresses();
      closeForm();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save address.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDefault = async (address: Address) => {
    const token = getToken();
    if (!token) return;

    try {
      await addressApi.updateAddress(token, address.id, { is_default: true });
      await fetchAddresses();
      setSuccess('Default address updated.');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update default address.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white border border-gray-100 p-6 md:p-10 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">Delivery</p>
            <h1 className="font-heading italic text-3xl md:text-4xl text-primary">My Addresses</h1>
            <p className="text-sm text-muted mt-2">Manage your shipping and billing addresses.</p>
          </div>
          {!showForm && (
            <button
              onClick={openAddForm}
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors"
            >
              <Plus size={16} />
              Add Address
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm mb-6">
            {success}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="border border-gray-100 bg-cream/50 p-6 mb-8 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading italic text-xl text-primary">
                {editingId ? 'Edit Address' : 'New Address'}
              </h3>
              <button type="button" onClick={closeForm} className="text-muted hover:text-primary">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AuthInput
                label="Contact Number"
                type="tel"
                value={form.contact_number}
                onChange={(e) =>
                  setForm({ ...form, contact_number: e.target.value.replace(/\D/g, '').slice(0, 10) })
                }
                required
              />
              <AuthInput
                label="Postal Code"
                type="text"
                value={form.postal_code}
                onChange={(e) =>
                  setForm({ ...form, postal_code: e.target.value.replace(/\D/g, '').slice(0, 6) })
                }
                required
              />
            </div>

            <AuthInput
              label="Address Line 1"
              value={form.address_line1}
              onChange={(e) => setForm({ ...form, address_line1: e.target.value })}
              placeholder="House no., Building, Street"
              required
            />

            <AuthInput
              label="Address Line 2"
              value={form.address_line2}
              onChange={(e) => setForm({ ...form, address_line2: e.target.value })}
              placeholder="Area, Landmark (optional)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AuthInput
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
              <AuthInput
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </div>

            <AuthInput
              label="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_default}
                onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                className="w-4 h-4 accent-gold"
              />
              <span className="text-sm text-charcoal">Set as default address</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-8 py-3.5 text-sm tracking-widest uppercase font-medium hover:bg-gold transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
            </button>
          </form>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200">
            <MapPin size={40} className="mx-auto text-muted mb-4" />
            <p className="text-charcoal/60 mb-4">No addresses saved yet.</p>
            <button
              onClick={openAddForm}
              className="text-gold text-sm tracking-wider uppercase font-medium hover:underline"
            >
              Add your first address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border p-5 relative transition-shadow hover:shadow-md ${
                  address.is_default ? 'border-gold bg-gold/5' : 'border-gray-100'
                }`}
              >
                {address.is_default && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-gold font-bold uppercase tracking-wider">
                    <Star size={12} fill="currentColor" />
                    Default
                  </span>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-charcoal leading-relaxed pr-16">
                    <p className="font-medium text-primary">{address.address_line1}</p>
                    {address.address_line2 && <p>{address.address_line2}</p>}
                    <p>
                      {address.city}, {address.state} — {address.postal_code}
                    </p>
                    <p>{address.country}</p>
                    {address.contact_number && (
                      <p className="text-muted mt-2">+91 {address.contact_number}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openEditForm(address)}
                    className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-charcoal hover:text-gold transition-colors"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  {!address.is_default && (
                    <button
                      onClick={() => setDefault(address)}
                      className="flex items-center gap-1.5 text-xs tracking-wider uppercase text-charcoal hover:text-gold transition-colors"
                    >
                      <Star size={14} />
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
