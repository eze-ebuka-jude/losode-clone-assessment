"use client";

import { Modal, Select, Slider, Button } from "antd";
import { useState, useEffect } from "react";

export interface CategoryOption {
    label: string;
    value: string;
}

type Props = {
    open: boolean;
    onClose: () => void;
    categories: CategoryOption[];
    currentCategory: string;
    currentPrice: number;

    onApply: (filters: { category: string; price: number }) => void;
};

export default function FilterModal({
    open,
    onClose,
    categories,
    currentCategory,
    currentPrice,
    onApply,
}: Props) {
    // 🧠 local state (inside modal only)
    const [category, setCategory] = useState(currentCategory);
    const [price, setPrice] = useState(currentPrice);

    // sync when modal opens
    useEffect(() => {
        setTimeout(() => {
            if (open) {
                setCategory(currentCategory);
                setPrice(currentPrice);
            }
        }, 1000)
    }, [open, currentCategory, currentPrice]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title="Filter Products"
        >
            <div className="space-y-6">
                {/* Category */}
                <div>
                    <p className="mb-2">Category</p>
                    <Select
                        value={category}
                        onChange={setCategory}
                        className="w-full"
                        options={[
                            { label: "All", value: "all" },
                            ...categories.map((c) => ({
                                label: c,
                                value: c,
                            })),
                        ]}
                    />
                </div>


                {/* Price */}
                <div>
                    <p className="mb-2">Max Price: ${price}</p>
                    <Slider
                        min={0}
                        max={2000}
                        value={price}
                        onChange={setPrice}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-6">
                    <Button onClick={onClose}>Cancel</Button>

                    <Button
                        type="primary"
                        onClick={() => {
                            onApply({ category, price });
                            onClose();
                        }}
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </Modal>
    )
}