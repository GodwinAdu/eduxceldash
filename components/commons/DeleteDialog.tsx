"use client"

import React, {  MouseEventHandler } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";


type DeleteDialogProps = {
    id: string;
    title: string;
    description: string;
    isDeleteDialogOpen: boolean;
    isLoading?: boolean;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onContinue: (data: string) => void;
};

export function DeleteDialog({
    id,
    title,
    description,
    isDeleteDialogOpen,
    isLoading,
    onCancel,
    onContinue,
}: DeleteDialogProps) {
    return (
        <AlertDialog open={isDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
                    <Button variant="destructive" size="sm" onClick={() => onContinue(id)}>{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> :"Continue"}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

