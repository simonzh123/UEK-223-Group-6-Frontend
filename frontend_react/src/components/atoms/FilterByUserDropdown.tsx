import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { User } from '../../types/models/User.model';

type Props = {
    users?: User[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
};

const FilterByUserDropdown: React.FC<Props> = ({
                                                   users = [],
                                                   value = '',
                                                   onChange,
                                                   className,
                                               }) => {
    return (
        <FormControl size="small" className={className} sx={{ minWidth: 160 }}>
            <InputLabel id="filter-label">Filter by User</InputLabel>
            <Select
                labelId="filter-label"
                label="Filter by User"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value as string)}
            >
                {users.map((user, idx) => {
                    const key = (user as any).id ?? idx;
                    const label = ((user as any).firstName && (user as any).lastName)
                        ? `${(user as any).firstName} ${(user as any).lastName}`
                        : (user as any).email ?? (user as any).id ?? String(idx);
                    const valueItem = (user as any).id ?? String(idx);
                    return <MenuItem key={key} value={valueItem}>{label}</MenuItem>;
                })}
            </Select>
        </FormControl>
    );
};

export default FilterByUserDropdown;