import React from 'react';
import { ShippingAddress } from '../../types';

interface AddressFormProps {
  address: ShippingAddress;
  setAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  errors: Partial<Record<keyof ShippingAddress, string>>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ address, setAddress, errors }) => {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-atelier-border pb-3">
        <span className="text-[10px] tracking-widest-luxury uppercase text-atelier-accent font-semibold block mb-1">
          Step 1
        </span>
        <h3 className="font-serif text-2xl text-atelier-text font-normal">
          Client & Destination Information
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Full Name */}
        <div className="sm:col-span-2 space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Full Name *
          </label>
          <input
            type="text"
            value={address.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="e.g. Eleanor Vance"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.fullName ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.fullName && <p className="text-rose-600 text-[11px]">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Email Address *
          </label>
          <input
            type="email"
            value={address.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="eleanor@atelier.com"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.email ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.email && <p className="text-rose-600 text-[11px]">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Phone Number *
          </label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+91 98200 12345"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.phone && <p className="text-rose-600 text-[11px]">{errors.phone}</p>}
        </div>

        {/* Address Line 1 */}
        <div className="sm:col-span-2 space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Delivery Address *
          </label>
          <input
            type="text"
            value={address.addressLine1}
            onChange={(e) => handleChange('addressLine1', e.target.value)}
            placeholder="Apartment, suite, street name"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.addressLine1 ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.addressLine1 && <p className="text-rose-600 text-[11px]">{errors.addressLine1}</p>}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            City *
          </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Mumbai / Delhi / Bengaluru"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.city ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.city && <p className="text-rose-600 text-[11px]">{errors.city}</p>}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            State / Province *
          </label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => handleChange('state', e.target.value)}
            placeholder="Maharashtra / Karnataka"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.state ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.state && <p className="text-rose-600 text-[11px]">{errors.state}</p>}
        </div>

        {/* Postal Code */}
        <div className="space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            PIN / Postal Code *
          </label>
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="400026"
            className={`w-full p-3 border bg-white focus:outline-none transition-colors ${
              errors.postalCode ? 'border-rose-500' : 'border-atelier-border focus:border-atelier-text'
            }`}
          />
          {errors.postalCode && <p className="text-rose-600 text-[11px]">{errors.postalCode}</p>}
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label className="uppercase tracking-luxury text-atelier-text-secondary font-medium">
            Country
          </label>
          <input
            type="text"
            value={address.country}
            disabled
            className="w-full p-3 border border-atelier-border bg-stone-100 text-atelier-text-secondary cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};
