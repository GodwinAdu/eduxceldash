
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ClassSelectionProps {
    SelectedStatus: (value: string) => void;
}
const ProjectStatus = ({ SelectedStatus }: ClassSelectionProps) => {

    return (
        <>
            <Select
                onValueChange={(value) => SelectedStatus(value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        <SelectItem value="CANCELED">CANCELLED</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>


        </>
    )
}

export default ProjectStatus
