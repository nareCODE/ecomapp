export default function PremiumDelivery() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-4">
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 text-[#588157] border-gray-300 rounded focus:ring-[#588157]"
        />
        <div>
          <div className="font-bold text-gray-900">FREE Delivery</div>
          <div className="text-sm text-gray-600">
            Sign up for Prime to get free delivery and exclusive deals
          </div>
          <a href="#" className="text-sm text-[#588157] hover:underline">
            Try Prime
          </a>
        </div>
      </label>
    </div>
  );
}
