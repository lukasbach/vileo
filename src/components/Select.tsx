import * as React from "react";
import {useEffect, useState} from "react";

export const Select: React.FC<{
  options?: Array<{ id: string, value: string, icon?: string }>;
  onChange?: (selection?: string) => any;
  title: string;
  dontSelect?: boolean;
  getOptions?: () => any;
}> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<false | string>(false);
  const [options, setOptions] = useState<Array<{ id: string, value: string, icon?: string }> | undefined>(undefined);

  return (
    <div
      className={ "select-container no-select " + (isOpen && 'open') }
    >
      <select>
        {
          options?.map(option => (
            <option key={option.id} value={option.value} selected={selection === option.id}>{ option.value }</option>
          ))
        }
      </select>

      <div
        className="label-container"
        onClick={async () => {
          setOptions(await props.getOptions?.() || props.options);
          setIsOpen(open => !open)
        }}
      >
        { props.title }
        <i className="material-icons arrow">keyboard_arrow_down</i>
      </div>
      <div className="options-container">
        <ul>
          {
            options?.map(option => (
              <li key={option.id} onClick={() => {
                if (!props.dontSelect) {
                  setSelection(option.id)
                }
                props.onChange?.(option.id);
                setIsOpen(false);
              }}>
                { option.icon && <i className="material-icons">{ option.icon }</i> }
                { option.value }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};
