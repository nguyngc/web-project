import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isBefore, startOfDay, startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, startOfWeek, endOfWeek, } from "date-fns";

function Calendar({ selectedDate, setSelectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  //calculate day in month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const currentMonthLabel = format(currentDate, "MMMM yyyy");

  return (
    <div className="flex flex-col gap-6">
      <div className="p-3 rounded-lg border border-[rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] opacity-50 hover:opacity-70 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 text-vision-primary" strokeWidth={1.33} />
            </button>
            <span className="text-vision-primary text-sm font-medium font-inter">
              {currentMonthLabel}
            </span>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-[rgba(0,0,0,0.1)] opacity-50 hover:opacity-70 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-vision-primary" strokeWidth={1.33} />
            </button>
          </div>
          {/* Grid day */}
          <div className="grid grid-cols-7 gap-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-[#717182] text-[13px] font-normal leading-5"
              >
                {day}
              </div>
            ))}
            {calendarDays.map((day) => {
              const isCurrentMonth = format(day, "MM") === format(currentDate, "MM");
              const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

              return (
                <button
                  key={day}
                  onClick={() => {
                    if (!isBefore(startOfDay(day), startOfDay(new Date()))) {
                      setSelectedDate(day);
                    }
                  }}
                  disabled={isBefore(startOfDay(day), startOfDay(new Date()))} 
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm font-normal
                      ${isSelected ? "bg-[#159EEC] text-white" : ""}
                      ${isCurrentMonth ? "text-vision-primary hover:bg-gray-100" : "text-[#717182] opacity-50"}
                      ${isBefore(startOfDay(day), startOfDay(new Date())) ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
