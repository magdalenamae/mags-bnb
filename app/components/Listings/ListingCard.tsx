"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";

import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);
    const handelCancle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }
         
        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation ,data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, "PP")} - ${format(end, "PP")}`;
    }, [reservation]);
    
    return (
        <div onClick={() => router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group bg-clip-padding pt40">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image src={data.imageSrc} layout="fill" objectFit="cover" alt={data.title} />
                </div>
                <div className="font-semibold">{data.title}, {data.locationValue}</div>
                <div className="font-thin">{data.guestCount} guests . {data.roomCount} bedroom . {data.bathroomCount} bathroom</div>
            </div>
        </div>
    )
}

export default ListingCard;