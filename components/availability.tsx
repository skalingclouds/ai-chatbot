'use client';

import { format } from 'date-fns';
import { OptionButtons } from './option-buttons';

interface Availability {
  dates: Record<string, string[]>;
  slots: Record<string, Record<string, number>>;
}

export function AvailabilityDisplay({
  availability,
  onSelect,
}: {
  availability: Availability;
  onSelect: (iso: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(availability.slots).map(([date, times]) => (
        <div key={date} className="flex flex-col gap-2">
          <div className="font-medium">
            {format(new Date(date), 'PPP')}
          </div>
          <OptionButtons
            options={Object.keys(times).map((iso) =>
              format(new Date(iso), 'p'),
            )}
            onSelect={(label) => {
              const iso = Object.keys(times).find(
                (t) => format(new Date(t), 'p') === label,
              );
              if (iso) onSelect(iso);
            }}
          />
        </div>
      ))}
    </div>
  );
}
