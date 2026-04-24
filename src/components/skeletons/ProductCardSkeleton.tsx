"use client";

import { Skeleton } from "antd";

export default function ProductCardSkeleton() {
    return (
        <div className="rounded-lg p-4">
            <Skeleton.Image active className="w-full h-40" />
            <Skeleton active paragraph={{ rows: 2 }} className="mt-2" />
        </div>
    );
}