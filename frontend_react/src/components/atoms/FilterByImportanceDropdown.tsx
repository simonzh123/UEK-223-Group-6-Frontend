import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Importance } from '../../types/models/List.model';

type Props = {
    importanceLevels?: Importance[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
};

const FilterByImportanceDropdown = ({ importanceLevels = Object.values(Importance) as Importance[], value = '', onChange, className }: Props) => {
    return (
        <FormControl size="small" className={className} sx={{ minWidth: 200 }}>
            <InputLabel id="filter-label">Filter by Importance</InputLabel>
            <Select
                labelId="filter-label"
                label="Filter by Importance"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value as string)}
            >
                {importanceLevels.map((level) => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterByImportanceDropdown;