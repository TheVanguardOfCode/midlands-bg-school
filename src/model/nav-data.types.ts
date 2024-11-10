export type DropdownLink = {
    dataI18n: string;
};

export type LinkItem = {
    isDropdown: boolean;
    dataI18n: string;
    dropdownLinks?: DropdownLink[];
};

export type NavData = {
    links: LinkItem[];
};
