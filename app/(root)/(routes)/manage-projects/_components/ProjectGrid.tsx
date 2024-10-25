"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { CellAction } from './cell-action';
import { Loader2 } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { toast } from '@/hooks/use-toast';
import ProjectStatus from './ProjectStatus';
import { fetchAllAssignments } from '@/lib/actions/assignment.actions';

const StatusCellRenderer = ({ value }: { value: "unpaid" | "paid" }) => {
    return (
        <span style={{ color: value === 'unpaid' ? 'red' : 'green' }}>
            {value}
        </span>
    );
};
const ProjectGrid = () => {
    const [selectedStatus, setSelectedStatus] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState<{ field: string, headerName?: string, width?: number, editable?: boolean, cellRenderer?: any }[]>([]);


    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setIsLoading(true)
                const status = "All";
                const data = await fetchAllAssignments(status)

                setRowData(data);
            } catch (error) {
                console.log(error)
                toast({
                    title: "something went wrong",
                    description: "Please try again later",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }
        const newColumnDefs = [
            { field: "fullname", headerName: "User Name", width: 250 },
            { field: "problemType", headerName: "Problem Type", width: 250 },
            { field: "price", headerName: "Payment Amount", width: 200 },
            {
                field: "payed",
                headerName: "Payed",
                width: 150,
                valueFormatter: (params: any) => params.value ? 'Yes' : 'No', // Format payed to Yes/No
                cellStyle: (params: any) => ({
                    color: params.value ? 'green' : 'red', // Green for Yes, Red for No
                    fontWeight: 'bold',
                }),
            },
            {
                field: "status",
                headerName: "Status",
                width: 150,
                cellStyle: (params: any) => {
                    switch (params.value) {
                        case 'PENDING':
                            return { color: 'orange', fontWeight: 'bold', backgroundColor: '#fff3e0' };
                        case 'CONFIRMED':
                            return { color: 'blue', fontWeight: 'bold', backgroundColor: '#e3f2fd' };
                        case 'COMPLETED':
                            return { color: 'green', fontWeight: 'bold', backgroundColor: '#e8f5e9' };
                        case 'CANCELLED':
                            return { color: 'red', fontWeight: 'bold', backgroundColor: '#ffebee' };
                        default:
                            return { border: '1px solid gray' };
                    }
                }
            },
            {
                field: "deadline",
                headerName: "Deadline Date",
                width: 150,
                valueFormatter: (params: any) => {
                    const date = new Date(params.value);
                    return date.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY
                },
                cellStyle: { textAlign: 'center' }, // Align dates in the center
            },
            {
                field: "actions",
                headerName: "Actions",
                cellRenderer: CellAction,
                width: 150,
            },
        ];
        setColDefs(newColumnDefs);
        fetchEmployee()
    }, []);



    const onSearchHandler = async () => {
        try {
            setIsLoading(true)
            const status = selectedStatus;
            const data = await fetchAllAssignments(status)

            setRowData(data);
        } catch (error) {
            console.log(error)
            toast({
                title: "something went wrong",
                description: "Please try again later",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    console.log(rowData, "row data")
    /**
   * Pagination settings for the grid.
   */
    const pagination = true;
    const paginationPageSize = 200;
    const paginationPageSizeSelector = [200, 500, 1000];
    return (
        <>
            <div className="border py-1 px-4 flex gap-5 items-center my-1">

                <div className="flex gap-4 items-center">
                    <label className="font-bold text-sm hidden lg:block">Select Status</label>
                    <ProjectStatus SelectedStatus={(value) => setSelectedStatus(value)} />
                </div>
                <Button disabled={isLoading} className="flex" size="sm" onClick={onSearchHandler}>{isLoading ? (<Loader2 className="w-4 h-4 ml-2 animate-spin" />) : "Search"}</Button>
            </div>
            <div className="py-4 mt-2 px-2">

                <div
                    className="ag-theme-quartz" // applying the grid theme
                    style={{ height: 500, width: "100%" }} // the grid will fill the size of the parent container
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                    />
                </div>
            </div>


        </>
    )
}

export default ProjectGrid
