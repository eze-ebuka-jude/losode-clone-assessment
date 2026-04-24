"use client";

import { Skeleton } from "antd";

export default function ProductDetailSkeleton() {
    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* 🖼️ Image Section */}
            <div>
                <Skeleton.Image
                    active
                    className="w-full h-112.5! rounded-lg"
                />

                {/* Thumbnail row */}
                <div className="flex gap-3 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton.Image
                            key={i}
                            active
                            className="w-20 h-20 rounded"
                        />
                    ))}
                </div>
            </div>

            {/* 📝 Product Info Section */}
            <div className="space-y-4">

                {/* Title */}
                <Skeleton active paragraph={false} title={{ width: "80%" }} />

                {/* Price */}
                <Skeleton.Input active size="large" className="w-32" />

                {/* Rating */}
                <Skeleton.Input active size="small" className="w-24" />

                {/* Description */}
                <Skeleton
                    active
                    paragraph={{ rows: 4, width: ["100%", "90%", "80%", "70%"] }}
                />

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                    <Skeleton.Button active size="large" className="w-40" />
                    <Skeleton.Button active size="large" className="w-40" />
                </div>

                {/* Extra details */}
                <div className="mt-8 space-y-2">
                    <Skeleton active paragraph={{ rows: 2 }} />
                </div>
            </div>
        </div>
    );
}