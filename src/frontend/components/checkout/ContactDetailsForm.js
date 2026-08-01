"use client";

export default function ContactDetailsForm({ register, errors }) {
  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-8">
      <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-6 border-b border-gray-100 pb-4">
        1. Contact Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="md:col-span-2">
          <label htmlFor="customer.fullName" className="block text-sm font-bold text-gray-700 mb-2">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="customer.fullName"
            type="text"
            {...register("customer.fullName")}
            className={`w-full px-4 py-3 rounded-xl border ${errors?.customer?.fullName ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
            placeholder="John Doe"
          />
          {errors?.customer?.fullName && (
            <p className="mt-1 text-sm text-brand-red font-medium">{errors.customer.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="customer.phone" className="block text-sm font-bold text-gray-700 mb-2">
            Phone Number <span className="text-brand-red">*</span>
          </label>
          <input
            id="customer.phone"
            type="tel"
            maxLength={10}
            {...register("customer.phone")}
            className={`w-full px-4 py-3 rounded-xl border ${errors?.customer?.phone ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
            placeholder="9876543210"
          />
          {errors?.customer?.phone && (
            <p className="mt-1 text-sm text-brand-red font-medium">{errors.customer.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="customer.email" className="block text-sm font-bold text-gray-700 mb-2">
            Email Address <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            id="customer.email"
            type="email"
            {...register("customer.email")}
            className={`w-full px-4 py-3 rounded-xl border ${errors?.customer?.email ? 'border-brand-red focus:ring-brand-red' : 'border-gray-200 focus:ring-brand-yellow'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
            placeholder="john@example.com"
          />
          {errors?.customer?.email && (
            <p className="mt-1 text-sm text-brand-red font-medium">{errors.customer.email.message}</p>
          )}
        </div>

      </div>
    </div>
  );
}
