import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Power } from 'lucide-react';
import CouponStatusBadge from './CouponStatusBadge';
import CouponTypeBadge from './CouponTypeBadge';
import DeleteCouponDialog from './DeleteCouponDialog';
import { formatDate } from '@/frontend/utils/dateHelpers';
import { updateAdminCouponStatus } from '@/frontend/services/admin/couponService';
import { toast } from 'sonner';

export default function CouponTable({ coupons, onCouponUpdate, onCouponDelete }) {
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [isTogglingId, setIsTogglingId] = useState(null);

  const handleToggleStatus = async (coupon) => {
    setIsTogglingId(coupon._id);
    try {
      const newStatus = !coupon.isActive;
      const updated = await updateAdminCouponStatus(coupon._id, newStatus);
      toast.success(`Coupon ${updated.code} has been ${newStatus ? 'activated' : 'deactivated'}`);
      onCouponUpdate(updated);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsTogglingId(null);
    }
  };

  return (
    <>
      <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4 pl-6">Code</th>
              <th className="p-4">Type</th>
              <th className="p-4">Min Order</th>
              <th className="p-4">Usage</th>
              <th className="p-4">Validity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors">
                
                <td className="p-4 pl-6 align-middle">
                  <div className="flex flex-col">
                    <span className="font-black text-brand-charcoal text-base truncate max-w-[150px]" title={coupon.code}>
                      {coupon.code}
                    </span>
                    {coupon.description && (
                      <span className="text-[10px] text-gray-500 font-medium truncate max-w-[150px] mt-0.5" title={coupon.description}>
                        {coupon.description}
                      </span>
                    )}
                  </div>
                </td>

                <td className="p-4 align-middle">
                  <CouponTypeBadge discountType={coupon.discountType} discountValue={coupon.discountValue} />
                </td>

                <td className="p-4 align-middle">
                  <span className="font-bold text-gray-900">
                    {coupon.minimumOrder > 0 ? `₹${coupon.minimumOrder}` : 'None'}
                  </span>
                </td>

                <td className="p-4 align-middle">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      {coupon.usageCount} <span className="text-gray-400 font-medium">/ {coupon.usageLimit || '∞'}</span>
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium mt-0.5">
                      Max {coupon.perUserLimit} per user
                    </span>
                  </div>
                </td>

                <td className="p-4 align-middle">
                  <div className="flex flex-col gap-0.5 text-xs text-gray-600">
                    <span className="font-medium"><span className="text-gray-400">From:</span> {formatDate(coupon.validFrom)}</span>
                    <span className="font-medium"><span className="text-gray-400">To:</span> {formatDate(coupon.expiresAt)}</span>
                  </div>
                </td>

                <td className="p-4 align-middle">
                  <CouponStatusBadge 
                    isActive={coupon.isActive} 
                    validFrom={coupon.validFrom} 
                    expiresAt={coupon.expiresAt} 
                  />
                </td>

                <td className="p-4 align-middle">
                  <span className="text-sm font-medium text-gray-700">
                    {formatDate(coupon.createdAt)}
                  </span>
                </td>

                <td className="p-4 align-middle text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => handleToggleStatus(coupon)}
                      disabled={isTogglingId === coupon._id}
                      className={`p-2 rounded-xl transition-colors border shadow-sm ${
                        coupon.isActive 
                          ? 'bg-white border-gray-200 text-gray-600 hover:text-brand-red hover:border-brand-red' 
                          : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                      }`}
                      title={coupon.isActive ? "Deactivate" : "Activate"}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    
                    <Link 
                      href={`/admin/coupons/${coupon._id}/edit`}
                      className="p-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:border-brand-yellow hover:text-brand-yellow transition-colors shadow-sm"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button 
                      onClick={() => setCouponToDelete(coupon)}
                      className="p-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {couponToDelete && (
        <DeleteCouponDialog 
          coupon={couponToDelete} 
          onClose={() => setCouponToDelete(null)}
          onDelete={(id) => {
            onCouponDelete(id);
            setCouponToDelete(null);
          }}
        />
      )}
    </>
  );
}
