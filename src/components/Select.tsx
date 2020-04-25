import * as React from "react";
import {useEffect, useState} from "react";

export const Select: React.FC<{
  options: Array<{ id: string, value: string, icon?: string }>;
  onChange?: (selection?: string) => any;
  renderTitle?: (selectedId: string, selectedValue: string) => React.ReactNode | string;
  title: string;
  dontSelect?: boolean;
}> = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<false | string>(false);
  const selectedItem = props.options.find(option => option.id === selection);

  return (
    <div
      className={ "select-container no-select " + (isOpen && 'open') }
    >
      <select>
        {
          props.options.map(option => (
            <option key={option.id} value={option.value} selected={selection === option.id}>{ option.value }</option>
          ))
        }
      </select>

      <div
        className="label-container"
        onClick={() => setIsOpen(open => !open)}
      >
        { selectedItem?.icon && <i className="material-icons selection-icon">{ selectedItem.icon }</i> }
        { !selectedItem ? props.title : props.renderTitle?.(selectedItem.id, selectedItem.value) || selectedItem.value }
        <i className="material-icons arrow">keyboard_arrow_down</i>
      </div>
      <div className="options-container">
        <ul>
          {
            props.options.map(option => (
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
