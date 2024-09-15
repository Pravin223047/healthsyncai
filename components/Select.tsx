"use client";
import ReactSelect from "react-select";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-white">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            control: (base) => ({
              ...base,
              backgroundColor: "#000", // bg-slate-900 color
              border: "1px solid #334155", // border color for the select control
              boxShadow: "none",
              "&:hover": {
                border: "1px solid #475569", // border color on hover
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#000", // bg-slate-900 color
              border: "1px solid #334155", // border color for the menu
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? "#475569" : "#1e293b", // selected option color
              color: state.isSelected ? "#ffffff" : "#cbd5e1", // text color
              "&:hover": {
                backgroundColor: "#334155", // option hover color
              },
            }),
            placeholder: (base) => ({
              ...base,
              color: "#cbd5e1", // placeholder color
            }),
            singleValue: (base) => ({
              ...base,
              color: "#ffffff", // single value color
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#334155", // background for selected items in multi-select
              color: "#ffffff",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#ffffff", // text color for selected items in multi-select
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: "#ffffff", // remove button color
              ":hover": {
                backgroundColor: "#475569", // remove button hover color
                color: "#ffffff",
              },
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Select;
