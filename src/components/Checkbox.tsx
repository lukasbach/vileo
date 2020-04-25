import * as React from "react";
import {useEffect, useState} from "react";

export const Checkbox: React.FC<{
  isChecked: boolean;
  onChange?: (checked: boolean) => any;
}> = props => {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  useEffect(() => props.onChange?.(isChecked), [isChecked, props.onChange]);

  return (
    <label className="checkbox-container">
      <input type="checkbox" onChange={e => setIsChecked(e.target.checked)} />
      <i className="material-icons">{ isChecked ? 'check_box' : 'check_box_outline_blank' }</i>
      Label text
    </label>
  )
};
