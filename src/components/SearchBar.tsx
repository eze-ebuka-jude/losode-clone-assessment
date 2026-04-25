"use client";

import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

export default function SearchBar({
    onSearch, setPage, setSearch
}: {
    onSearch: (value: string) => void;
    setPage: (value: number) => void;
    setSearch: (value: string) => void;
}) {
    const [value, setValue] = useState("");

    return (
        <Search
            placeholder="Search products..."
            className="tw-search"
            value={value}
            allowClear
            enterButton
            size="large"
            onChange={(e) => setValue(e.target.value)}
            onSearch={(value) => {
                setPage(1); // reset pagination
                setSearch(value);
            }}
        />
    );
}