import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { FC } from "react";
import { commonStyles } from "./common-styles";

export interface CheckboxProps {
    label: string;
    value: string
}

interface CheckboxGroupProps {
    checkboxes: CheckboxProps[],
    onCheckboxChange: (name: string, checked: boolean) => void;
    title: string;
}

export const CustomCheckbox: FC<CheckboxGroupProps> = ({checkboxes, onCheckboxChange, title}) => {
    const { checkboxStyles } = commonStyles;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Doing something ', e);
        const { name, checked } = e.target;
        onCheckboxChange(name, checked);

    }

    return(
        <FormGroup style={checkboxStyles}>
            <Typography>
                {title}
            </Typography>
            {checkboxes.map(checkbox => {
                return(
                    <FormControlLabel
                        key={checkbox.value as string}
                        control={
                            <Checkbox
                                color='primary'
                                onChange={handleOnChange}
                            />
                        }
                        label={checkbox.label}
                    />
                )
            })}
        </FormGroup>
    )
}