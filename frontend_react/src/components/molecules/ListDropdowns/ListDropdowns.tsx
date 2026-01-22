import React, {useState} from 'react';
import {Box} from '@mui/system';
import FilterByImportanceDropdown from '../../atoms/FilterByImportanceDropdown';
import FilterByUserDropdown from "../../atoms/FilterByUserDropdown";
import SortDropdown from '../../atoms/SortDropdown';
import {Importance, SortByListCategories} from '../../../types/models/List.model';
import {User} from '../../../types/models/User.model';
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export type ListDropdownsProps = {
    importanceLevels?: Importance[];
    sortCategories?: SortByListCategories[];
    filterValue?: string;
    sortValue?: SortByListCategories;
    onFilterChange?: (value: string) => void;
    onSortChange?: (value: SortByListCategories) => void;
    className?: string;
    users?: User[];
    userFilterValue?: string;
    onUserFilterChange?: (value: string) => void;
    isAdmin?: boolean;
    isAscending?: boolean;
    onIsAscendingChange?: () => void;
};

const ListDropdowns = ({
                           importanceLevels = [],
                           sortCategories = [],
                           filterValue,
                           sortValue,
                           onFilterChange,
                           onSortChange,
                           className,
                           users = [],
                           userFilterValue,
                           onUserFilterChange,
                           isAdmin,
                           isAscending,
                           onIsAscendingChange,
                       }: ListDropdownsProps) => {
    const levels: Importance[] = importanceLevels.length
        ? importanceLevels
        : (Object.values(Importance).filter(() => true) as Importance[]);

    const categories: SortByListCategories[] = sortCategories.length
        ? sortCategories
        : (Object.values(SortByListCategories).filter(() => true) as SortByListCategories[]);

    const [internalFilter, setInternalFilter] = useState<string>('');
    const [internalSort, setInternalSort] = useState<SortByListCategories>(SortByListCategories.DATE);
    const [internalUserFilter, setInternalUserFilter] = useState<string>('');
    const [internalIsAscending, setInternalIsAscending] = useState<boolean>(true);

    const currentFilter = filterValue !== undefined ? filterValue : internalFilter;
    const currentSort = sortValue !== undefined ? sortValue : internalSort;
    const currentUserFilter = userFilterValue !== undefined ? userFilterValue : internalUserFilter;
    const currentIsAscending = isAscending !== undefined ? isAscending : internalIsAscending;

    const handleFilterChange = (newValue: string) => {
        if (onFilterChange) onFilterChange(newValue);
        else setInternalFilter(newValue);
    };

    const handleSortChange = (newValue: SortByListCategories) => {
        if (onSortChange) onSortChange(newValue);
        else setInternalSort(newValue);
    };

    const handleUserFilterChange = (newValue: string) => {
        if (onUserFilterChange) onUserFilterChange(newValue);
        else setInternalUserFilter(newValue);
    };

    const handleSortOrderChange = () => {
        if (onIsAscendingChange) onIsAscendingChange();
        else setInternalIsAscending(!internalIsAscending);
    };

    return (
        <Box sx={{ padding: 2, display: 'flex', gap: 1, alignItems: 'center' }} className={className}>
            <FilterByImportanceDropdown importanceLevels={levels} value={currentFilter} onChange={handleFilterChange} />
            {isAdmin ? (
                <FilterByUserDropdown users={users} value={currentUserFilter} onChange={handleUserFilterChange} />
            ) : null}
            <SortDropdown categories={categories} value={currentSort} onChange={handleSortChange}/>
            {currentSort !== null ? (
                <FormControlLabel
                    control={
                        <Switch
                            checked={currentIsAscending}
                            onChange={handleSortOrderChange}
                        />
                    }
                    label={currentIsAscending ? 'Ascending' : 'Descending'}
                />
            ) : null}
        </Box>
    );
};

export default ListDropdowns;