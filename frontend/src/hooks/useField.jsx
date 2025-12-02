import { useState } from "react";

export default function useField(type) {
  // Nếu là checkbox thì khởi tạo state là false, còn lại là chuỗi rỗng
  const [value, setValue] = useState(type === "checkbox" ? false : "");

  const onChange = (e) => {
    if (type === "checkbox") {
      setValue(e.target.checked); //checkbox dùng checked
    } else {
      setValue(e.target.value);   //các loại input khác dùng value
    }
  };

  // Trả về props phù hợp cho từng loại input
  if (type === "checkbox") {
    return { type, checked: value, onChange, value };
  }

  return { type, value, onChange };
}
