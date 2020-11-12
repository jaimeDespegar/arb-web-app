import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  
  const { tasksIndexes, tasks, onChangeRadio, checked, setChecked, setItemSelected, items, newChecked, setNewChecked } = props;
  const tableCellClasses = classnames(classes.tableCell, {});

  return (
    <Table className={classes.table}>
      <TableBody>
        {tasksIndexes.map(value => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <Radio
                checked={checked ? checked.indexOf(value) !== -1 : false}
                tabIndex={value}
                onChange={() => onChangeRadio(value, checked, setChecked,  tasks, setItemSelected, items,  newChecked, setNewChecked)}
                icon={<FiberManualRecord className={classes.radioUnchecked} />}
                checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                classes={{
                  checked: classes.radio
                }}
              />
            </TableCell>
            <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};
