import {useSelector} from "react-redux";
import {RootState} from "../../../interfaces.ts";
import useCity from "../../../hooks/useCity.tsx";
import useUsers from "../../../hooks/useUsers.tsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const {newData, handleSelect} = useCity()
    const {defaultWeather} = useUsers()

    const user = useSelector((state: RootState) => state.users.currentUser);
    return (
        <Autocomplete
            options={newData}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <li {...props} key={option.id} className={styles.list}>
                    <div>{option.name}, {option.stateCode}</div>
                    {user?.weatherDefault?.name === option.name ? null :
                        <button onClick={() => defaultWeather(option)}>Set Default</button>}
                </li>
            )}
            className={styles.SearchBar}
            renderInput={(params) => <TextField {...params} label="Location"/>}
            onChange={handleSelect}
        />)
}

export default SearchBar