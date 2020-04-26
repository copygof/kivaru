import React from "react"
import {
  Box,
  ButtonBase,
  InputAdornment,
  Grid,
  TextField,
} from "@material-ui/core"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers"
import { makeStyles } from "@material-ui/core/styles"
import { CalendarToday, Watch } from "@material-ui/icons"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 14,
    borderRadius: 4,
    border: "1px solid #19769F",
    boxShadow: "0px 1px 5px -2px #707070",
    // boxShadow: "0px 6px 6px 1px rgba(0, 0, 0, 0.11)",
  },
  datePickerWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  datePicker: {
    color: "#19769F",
  },
  timePickerWrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  timePicker: {
    color: "#19769F",
  },
  dayBadge: {
    backgroundColor: "#ffffff",
    boxShadow: "0px 1px 5px -2px #707070",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  dayBadgeActive: {
    backgroundColor: "#15C72C",
    boxShadow: "0px 1px 5px -2px #707070",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  dayText: {
    color: "#D6D6D6",
    fontSize: 11,
    fontWeight: "bold",
  },
  dayTextActive: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
  dayRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 780,
    marginTop: 20,
  },
  timeRow: {
    display: "flex",
    // justifyContent: "space-between",
    maxWidth: 780,
    marginTop: 20,
    flexFlow: "row wrap",
  },
  timeBadge: {
    backgroundColor: "#ffffff",
    boxShadow: "0px 1px 5px -2px #707070",
    width: 70,
    height: 35,
    borderRadius: 70 / 2,
    margin: 5,
    flex: "1 0 calc(25% - 10px)",
  },
  timeBadgeActive: {
    backgroundColor: "#ffffff",
    // boxShadow: `6px 6px 12px #f0f0f0, -6px -6px 12px #ffffff, inset 6px 6px 12px #f0f0f0, inset -6px -6px 12px #ffffff;`,
    boxShadow: "0px 1px 5px -2px #707070",
    width: 70,
    height: 35,
    borderRadius: 70 / 2,
    margin: 5,
    flex: "1 0 calc(25% - 10px)",
  },
  timeText: {
    color: "#3C3C59",
    fontSize: 11,
    fontWeight: "bold",
  },
  timeTextActive: {
    color: "#15C72C",
    fontSize: 11,
    fontWeight: "bold",
  },
  input: {
    // color: "red",
  },
})

function DayBadge({ children, onClick, isActive }: any) {
  const classes = useStyles()
  return (
    <ButtonBase
      className={isActive ? classes.dayBadgeActive : classes.dayBadge}
      onClick={onClick}
    >
      <p className={isActive ? classes.dayTextActive : classes.dayText}>
        {children}
      </p>
    </ButtonBase>
  )
}

function TimeBadge({ children, onClick, isActive }: any) {
  const classes = useStyles()
  return (
    <ButtonBase
      className={isActive ? classes.timeBadgeActive : classes.timeBadge}
      onClick={onClick}
    >
      <p className={isActive ? classes.timeTextActive : classes.timeText}>
        {children}
      </p>
    </ButtonBase>
  )
}

export type DoctorWorkingDateProps = {
  isDisabledDate?: boolean
  isDisabledTime?: boolean
  onClickDate: (value: any) => void
  onClickTime: (value: any) => void
  onSelectDay: (value: any) => void
  onSelectTime: (value: any) => void
  dayList: any[]
  timeList: any[]
}

function DoctorWorkingDate(props: DoctorWorkingDateProps) {
  const classes = useStyles()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null)

  const handleDateChange = (date: any | null) => {
    setSelectedDate(date)
    props.onClickDate(date)
  }

  const handleTimeChange = (date: any | null) => {
    setSelectedTime(date)
    props.onClickTime(date)
  }

  return (
    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.datePickerWrapper}>
          <CalendarToday
            color="secondary"
            style={{ marginTop: 18, marginRight: 18 }}
          />
          <DatePicker
            className={classes.datePicker}
            label="Date"
            format="DD/MM/YYYY"
            value={selectedDate}
            onChange={handleDateChange}
            InputProps={{
              className: classes.input,
              color: "secondary",
            }}
            minDate={new Date()}
            disabled={props.isDisabledDate}
          />
        </div>
        <div className={classes.dayRow}>
          {props.dayList.map((day) => {
            console.log("day.isActive => ", day.isActive)
            return (
              <DayBadge
                key={day.name}
                isActive={day.isActive}
                onClick={() => props.onSelectDay(day)}
              >
                {day.name}
              </DayBadge>
            )
          })}
        </div>

        <div className={classes.timePickerWrapper}>
          <Watch color="secondary" style={{ marginTop: 18, marginRight: 18 }} />
          <TimePicker
            className={classes.timePicker}
            clearable
            ampm={false}
            label="Time"
            value={selectedTime}
            onChange={handleTimeChange}
            disabled={props.isDisabledTime}
          />
        </div>
        <div className={classes.timeRow}>
          {props.timeList.map((time) => (
            <TimeBadge
              key={time.name}
              isActive={time.isActive}
              onClick={() => props.onSelectTime(time)}
            >
              {time.name}
            </TimeBadge>
          ))}
        </div>
      </MuiPickersUtilsProvider>
    </div>
  )
}

DoctorWorkingDate.defaultProps = {
  isDisabledDate: true,
  isDisabledTime: true,
  onClickDate() {},
  onClickTime() {},
}

export default DoctorWorkingDate
