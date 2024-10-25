"use client";

import { useEffect, useState } from "react";
import { Edit, Edit2, Edit3, Eye, FileWarning, Loader2, MoreHorizontal, Trash, View } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { DeleteDialog } from "@/components/commons/DeleteDialog";
import { updateAssignmentStatus } from "@/lib/actions/assignment.actions";
import UploadButton from "@/components/commons/UploadButton";




interface CellActionProps {
    data: IUser;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [isCompleteDialogOpen, setCompleteDialogOpen] = useState(false);
    const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);
    const router = useRouter();


   


    const handleAction = async (assignmentId: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') => {
        try {
            setLoading(true);
            await updateAssignmentStatus(assignmentId, status);

            toast({
                title: "Deleted Successfully",
                description: "Please Account was deleted successfully...",

            });
            window.location.reload();
        } catch (error: any) {

            toast({
                title: "Something Went Wrong",
                description: `${error.message}`,
                variant: "destructive",
            });
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };



    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <UploadButton assignmentId={data._id} />
                    <DropdownMenuItem className="text-blue-600 hover:text-blue-700" onClick={(e) => { e.preventDefault(); setConfirmDialogOpen(true) }}>
                        <FileWarning className="mr-2 h-4 w-4" /> confirm
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-600 hover:text-green-700" onClick={(e) => { e.preventDefault(); setCompleteDialogOpen(true) }}>
                        <FileWarning className="mr-2 h-4 w-4" /> complete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 hover:text-red-700" onClick={(e) => { e.preventDefault(); setCancelDialogOpen(true) }}>
                        <Trash className="mr-2 h-4 w-4" /> Cancel
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            {isConfirmDialogOpen && (
                <DeleteDialog
                    id={data?._id}
                    isLoading={loading}
                    isDeleteDialogOpen={isConfirmDialogOpen}
                    title="Are you sure you want to Confirm this Assignment?"
                    description="This action cannot be undone. Are you sure you want to proceed?"
                    onCancel={() => setConfirmDialogOpen(false)}
                    onContinue={() => handleAction(data._id, "CONFIRMED")}
                />
            )}
            {isCompleteDialogOpen && (
                <DeleteDialog
                    id={data?._id}
                    isLoading={loading}
                    isDeleteDialogOpen={isCompleteDialogOpen}
                    title="Are you sure you want to Complete this Assignment?"
                    description="This action cannot be undone. Are you sure you want to proceed?"
                    onCancel={() => setCompleteDialogOpen(false)}
                    onContinue={() => handleAction(data._id, "COMPLETED")}
                />
            )}
            {isCancelDialogOpen && (
                <DeleteDialog
                    id={data?._id}
                    isLoading={loading}
                    isDeleteDialogOpen={isCancelDialogOpen}
                    title="Are you sure you want to Cancel this Assignment?"
                    description="This action cannot be undone. Are you sure you want to proceed?"
                    onCancel={() => setCancelDialogOpen(false)}
                    onContinue={() => handleAction(data._id, "CANCELLED")}
                />
            )}
        </>
    );
};
