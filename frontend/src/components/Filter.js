import SearchIcon from "@mui/icons-material/Search";
import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default ({ filter, handleChange }) => {
  return (
    <>
      <FormControl>
        <InputLabel>發送名稱</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="發送名稱"
          value={filter.name}
          onChange={handleChange("name")}
        />
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        <DatePicker
          slots={<TextField />}
          label={"開始發射時間"}
          onChange={handleChange("start")}
          value={filter.start ? dayjs(filter.start) : null}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        <DatePicker
          slots={<TextField />}
          label={"結束發射時間"}
          onChange={handleChange("end")}
          value={filter.end ? dayjs(filter.end) : null}
        />
      </LocalizationProvider>
      <FormControl>
        <InputLabel>發射狀態</InputLabel>
        <Select
          value={filter.status}
          label="發射狀態"
          onChange={handleChange("status")}
        >
          <MenuItem value={"all"}>全部</MenuItem>
          <MenuItem value={true}>是</MenuItem>
          <MenuItem value={false}>否</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>排序</InputLabel>
        <Select
          value={filter.sort}
          label="排序"
          onChange={handleChange("sort")}
        >
          <MenuItem value={-1}>發射時間由近到遠</MenuItem>
          <MenuItem value={1}>發射時間由遠到近</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
