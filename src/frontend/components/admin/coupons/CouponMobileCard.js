import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, IndianRupee, Percent, Power, Edit, Trash2 } from 'lucide-react';
import CouponStatusBadge from './CouponStatusBadge';
import DeleteCouponDialog from './DeleteCouponDialog';
import { formatDate } from '@/frontend/utils/dateHelpers';
import { updateAdminCouponStatus } from '@/frontend/services/admin/couponService';
import { toast } from 'sonner';

export default function CouponMobileCard({ coupon, onCouponUpdate, onCouponDelete }) {
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      const newStatus = !coupon.isActive;
      const updated = await updateAdminCouponStatus(coupon._id, newStatus);
      toast.success(`Coupon ${updated.code} has been ${newStatus ? 'activated' : 'deactivated'}`);
      onCouponUpdate(updated);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <div className="lg:hidden bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative flex flex-col gap-3">
        
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="font-black text-gray-900 leading-tight mb-0.5 truncate max-w-[200px] text-lg">
              {coupon.code}
            </h3>
            <CouponStatusBadge 
              isActive={coupon.isActive} 
              validFrom={coupon.validFrom} 
              expiresAt={coupon.expiresAt} 
            />
          </div>
          <div className="text-right flex flex-col items-end">
            <div className={`flex items-center gap-1 font-black ${
              coupon.discountType === 'percentage' ? 'text-brand-yellow drop-shadow-sm' : 'text-green-600'
            }`}>
              {coupon.discountType === 'percentage' ? (
                <>
                  <span className="text-xl">{coupon.discountValue}</span>
                  <Percent className="w-4 h-4" />
                </>
              ) : (
                <>
                  <IndianRupee className="w-4 h-4" />
                  <span className="text-xl">{coupon.discountValue}</span>
                </>
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
              Discount
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 rounded-xl p-3 border border-gray-100">
          <div className="col-span-2 flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs font-medium">
              {formatDate(coupon.validFrom)} - {formatDate(coupon.expiresAt)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs font-medium">{coupon.usageCount} / {coupon.usageLimit || '∞'} used</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <IndianRupee className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs font-medium">Min: ₹{coupon.minimumOrder || 0}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100 items-center justify-between">
          <button 
            onClick={handleToggleStatus}
            disabled={isToggling}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border shadow-sm flex items-center gap-1.5 ${
              coupon.isActive 
                ? 'bg-white border-gray-200 text-gray-600 hover:text-brand-red hover:border-brand-red' 
                : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
            }`}
          >
            {isToggling ? (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Power className="w-3.5 h-3.5" />
            )}
            {coupon.isActive ? 'Deactivate' : 'Activate'}
          </button>
          
          <div className="flex items-center gap-2">
            <Link 
              href={`/admin/coupons/${coupon._id}/edit`}
              className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-brand-yellow hover:text-brand-yellow transition-colors shadow-sm"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => setCouponToDelete(coupon)}
              className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:border-brand-red hover:text-brand-red transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
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
