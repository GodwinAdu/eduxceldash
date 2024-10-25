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




interface CellActionProps {
    data: IUser;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);


    const router = useRouter();
    const pathname = usePathname()

    const params = useParams();

    const id = params.adminId as string;
    const schoolId = params.schoolId as string;


    const handleDeleteAccount = async (id: string) => {
        try {
            setLoading(true);
            //   await deleteAccount(id)

            toast({
                title: "Deleted Successfully",
                description: "Please Account was deleted successfully...",

            });
            router.refresh();
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

                    <Link href={`/manage-user/${data?._id}`}>
                        <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Manage User
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem className="text-yellow-600 hover:text-yellow-700" onClick={(e) => { e.preventDefault(); setDeleteDialogOpen(true) }}>
                        <FileWarning className="mr-2 h-4 w-4" /> Ban user
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 hover:text-red-700" onClick={(e) => { e.preventDefault(); setDeleteDialogOpen(true) }}>
                        <Trash className="mr-2 h-4 w-4" /> Delete user
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            {isDeleteDialogOpen && (
                <DeleteDialog
                    id={data?._id}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    title="Are you sure you want to delete this Account?"
                    description="This action cannot be undone. Are you sure you want to proceed?"
                    onCancel={() => setDeleteDialogOpen(false)}
                    onContinue={handleDeleteAccount}
                />
            )}
        </>
    );
};
