import {FC, useState, useEffect} from 'react';
import { SelectPropTypes, ListItemTypes, LocalListItemTypes, } from "./types";
import './style.scss';

const Select: FC<SelectPropTypes> = (props) => {
  const {
    id,
    list,
    onchange,
    label,
    placeholder,
    chosen,
    icon
  } = props;

  const [localList, setLocalList] = useState<Array<LocalListItemTypes> | null>(null);
  const [dropdownOpen , setDropdownOpen] = useState<boolean>(false);
  const [chosenItem, setChosenItem] = useState<LocalListItemTypes | ListItemTypes | undefined>(chosen);


  useEffect(() => {
    const localList = list.map((item: ListItemTypes) => {
      return {
        ...item,
        active: chosen?.id === item.id
      }
    })
    setLocalList(localList);
  }, [list, chosen])


  const changeHandler = (item: LocalListItemTypes) => {
    setLocalList((prevState: Array<LocalListItemTypes> | null) => {
      if (prevState) {
        return prevState.map((localItem: LocalListItemTypes) => {
          return {
            ...localItem,
            active: localItem.id === item.id
          }
        })
      }
      return []
    })
    onchange(id, item.name, true);
    setChosenItem(item);
    setDropdownOpen(false);
  }
  return (
    <div className='select_container'>
      {label && <div className='label'>{label}</div>}
      <div className={'header'} onClick = {() => {
        setDropdownOpen((prevState: boolean) => !prevState)
        }}>
        <div className='placeholder'>
          {chosenItem ? chosenItem.name : placeholder}
        </div>
      </div>
      {dropdownOpen && (
        <ul className='dropdown_ul'>
          {localList && localList.map((item: LocalListItemTypes) => {
            return (
              <li 
                key={item.id}
                onClick = {() => {changeHandler(item)}}
                >
                <div className={`list_item_container ${item.active ? 'active' : ''}`}>
                 {item.name}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Select;