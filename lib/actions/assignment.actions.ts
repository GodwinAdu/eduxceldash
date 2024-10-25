"use server"

import { wrappedSendMail } from "@/helpers/node_mailer";
import Assignment from "../models/Assignment.models";
import { connectToDB } from "../mongoose";
import User from "../models/user.models";

export async function fetchAllAssignments(status: string) {
    try {
        await connectToDB();

        // Build query dynamically
        const query = status === "All" ? {} : { status };

        // Fetch assignments based on the query
        const assignments = await Assignment.find(query).lean(); // lean() returns plain JS objects

        // Return the assignments or an empty array if none found
        return assignments.length > 0 ? JSON.parse(JSON.stringify(assignments)) : [];

    } catch (error) {
        console.error("Error fetching assignments:", error);
        throw new Error("Failed to fetch assignments");
    }
}

export async function updateAssignmentStatus(assignmentId: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
    try {
        await connectToDB();

        // Update the assignment status
        const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status }, { new: true }); // lean() returns plain JS objects
        const user = await User.findOne({ _id: assignment?.userId as string })
        const statusMessage = (status:string) => {
            switch (status) {
              case 'CONFIRMED':
                return 'Your assignment has been confirmed and is currently being processed. Please stay tuned for further updates.';
              case 'COMPLETED':
                return 'We are pleased to inform you that your assignment has been completed. You can now download it.';
              case 'CANCELLED':
                return 'Unfortunately, your assignment has been cancelled. Please contact support if you have any questions.';
              default:
                return 'There has been an update to your assignment status. Please check for more details.';
            }
          };
          
          const mailOptions = {
            from: "EduxcelMaster <jutechdevs@gmail.com>",
            to: user.email,
            subject: 'Assignment Status Update',
            html: `
              <html>
                <body>
                  <h2>Assignment Status Update</h2>
                  <p>Hello ${user.fullName},</p>
                  <p>${statusMessage(status)}</p>
                  <p>Best regards,<br>Jutech Devs</p>
                  <p style="font-size: 12px; color: #888888;">This is an automated message. Please do not reply.</p>
                </body>
              </html>
            `,
          };
        await wrappedSendMail(mailOptions)

    } catch (error) {
        console.error("Error updating assignment status:", error);
        throw new Error("Failed to update assignment status");
    }
}
export async function updateAssignmentFileUrl(assignmentId: string, fileUrl: string) {
    try {
        await connectToDB();
        console.log("Updating assignment file", assignmentId, fileUrl);

        // Update the assignment status
         await Assignment.findByIdAndUpdate(assignmentId, { fileUrl }, { new: true }); // lean() returns plain JS objects
      

    } catch (error) {
        console.error("Error updating assignment status:", error);
        throw new Error("Failed to update assignment status");
    }
}