"use client";

import { ArrowUpRight, Clock, CurrencyDollarCircle, MarkerPin02 } from "@untitledui/icons";
import { type BadgeColors } from "@/components/base/badges/badge-types";
import { BadgeWithDot } from "@/components/base/badges/badges";


export interface JobCardSimpleProps {
    title: string;
    location: string;
    type: string;
    badgeText?: string;
    badgeColor: BadgeColors;
}

export const JobCardSimple = (props: JobCardSimpleProps) => {
    return (
        <div className="relative flex flex-col rounded-xs py-6 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-4">
            <div className="absolute top-0 h-px w-full border-t border-secondary"></div>
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                <h3 className="text-md font-semibold text-primary">{props.title}</h3>
                <BadgeWithDot color={props.badgeColor} size="md" type="pill-color">
                    {props.badgeText}
                </BadgeWithDot>
            </div>
            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">29 июня 2026</p>
            <div className="mt-5 flex gap-4">
                <div className="flex items-center gap-1.5">
                    <MarkerPin02 size={20} className="text-fg-quaternary" />
                    <span className="text-sm font-medium text-tertiary">{props.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={20} className="text-fg-quaternary" />
                    <span className="text-sm font-medium text-tertiary">{props.type}</span>
                </div>
            </div>
        </div>
    );
};

