"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { BadgeAlert, CheckSquare } from "lucide-react";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => <div className="flex gap-4 items-center">
            <Avatar>
                <AvatarImage src={row.original.imageUrl} alt="@shadcn" />
                <AvatarFallback>{row.original.username[0]}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{row.original.fullName}</p>
        </div>,
    },
    {
        accessorKey: "lastLogin",
        header: "Last sign in",
        cell: ({ row }) => (
            <div className="">{moment(row.original.lastLogin).fromNow()}</div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <div className="">{moment(row.original.createdAt).fromNow()}</div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
