import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SortByListCategories } from '../../types/models/List.model';

type Props = {
    categories?: SortByListCategories[];
    value?: SortByListCategories;
    onChange?: (value: SortByListCategories) => void;
    className?: string;
};

const SortDropdown = ({ categories = Object.values(SortByListCategories) as SortByListCategories[], value, onChange, className }: Props) => {
    return (
        <FormControl size="small" className={className} sx={{ minWidth: 160 }}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
                labelId="sort-label"
                label="Sort by"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value as SortByListCategories)}
            >
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortDropdown;