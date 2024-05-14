// components/profile/PlaceSelect.tsx
import React from "react";

interface PlaceSelectProps {
  place: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  places: string[];
}

const PlaceSelect: React.FC<PlaceSelectProps> = ({ place, onChange, places }) => {
  return (
    <div>
      <label htmlFor="place" className="block text-sm font-medium text-gray-700">
        在住
      </label>
      <select name="place" value={place} onChange={onChange} className="mt-1 block w-full">
        <option value="">選択してください</option>
        {places.map((place) => (
          <option key={place} value={place}>
            {place}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlaceSelect;
